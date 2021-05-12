import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Modal,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import MenuDrawer from 'react-native-side-drawer';
import {useHeaderHeight} from '@react-navigation/stack';
import {getByName} from '../backend/index';
import Table from '../components/Table';
export const ScreenWidth = Math.floor(Dimensions.get('screen').width);
export const ScreenHeight = Math.floor(Dimensions.get('screen').height);

export default function MainView(props) {
  const HeaderHeight = useHeaderHeight();
  const [navigation, setNavigation] = useState(props.navigation);
  const [unit, setUnit] = useState('°C');
  const input = useRef('Hà Nội');
  const [error, setError] = useState('');
  const [informationArr, setInformationArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [information, setInformation] = useState({
    coord: {
      lon: 105.8412,
      lat: 21.0245,
    },
    weather: [
      {
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    base: 'stations',
    main: {
      temp: 308.07,
      feels_like: 310.42,
      temp_min: 308.07,
      temp_max: 308.07,
      pressure: 1002,
      humidity: 41,
      sea_level: 1002,
      grnd_level: 1001,
    },
    visibility: 10000,
    wind: {
      speed: 3.01,
      deg: 176,
      gust: 4.4,
    },
    clouds: {
      all: 9,
    },
    dt: 2020713811,
    sys: {
      type: 1,
      id: 9308,
      country: 'VN',
      sunrise: 2020685250,
      sunset: 2020732317,
    },
    timezone: 25200,
    id: 1581130,
    name: 'Hanoi',
    cod: 200,
  });
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    getInformaiton();
  }, []);
  async function getInformaiton() {
    const result = await getByName(input.current);
    console.log('infor', result);
    if (result !== undefined) setInformation(result);
    else setError('khong co thanh pho trong he thong');
  }
  const changeCity = async () => {
    Keyboard.dismiss();
    setError('');
    await getInformaiton();
  };
  const onRefresh = () => {
    setLoading(true);
    getInformaiton();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MenuDrawer
        open={drawer}
        drawerContent={
          <View style={{backgroundColor: '#fff', flex: 1}}>
            <View style={{height: 100, backgroundColor: '#99ccff'}}></View>
            <View style={{marginTop: 30, marginHorizontal: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>Unit</Text>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 30,
                    borderRadius: 3,
                    backgroundColor: unit === '°C' ? '#d9d9d9' : '#fff',
                  }}
                  onPress={() => {
                    setDrawer(false);
                    setUnit('°C');
                  }}>
                  <Text style={{fontSize: 20}}>°C</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 20,
                    width: 40,
                    height: 30,
                    borderRadius: 3,
                    backgroundColor: unit === '°F' ? '#d9d9d9' : '#fff',
                  }}
                  onPress={() => {
                    setDrawer(false);
                    setUnit('°F');
                  }}>
                  <Text style={{fontSize: 20}}>°F</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        drawerPercentage={80}
        opacity={0.4}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => {
              setDrawer(true);
            }}>
            <Octicons name="three-bars" size={26} color="#a6a6a6" />
          </TouchableOpacity>
          <View style={{marginHorizontal: 20, flex: 1}}>
            <TextInput
              style={{backgroundColor: '#f2f2f2', height: 40, borderRadius: 5}}
              placeholder="Search place"
              defaultValue={input.current}
              onChangeText={text => {
                input.current = text;
              }}
            />
          </View>
          <TouchableOpacity style={{marginRight: 10}} onPress={changeCity}>
            <Octicons name="search" size={20} color="#a6a6a6" />
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            setDrawer(false);
            console.log(`drawer`, drawer);
            Keyboard.dismiss();
          }}
          style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }>
            <View
              style={{
                height: ScreenHeight - 60,
                backgroundColor: '#66b3ff',
              }}>
              <Text>{error}</Text>
              <View style={styles.mainWeather}>
                <View
                  style={{
                    flexDirection: 'column',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={[
                        {color: '#fff', fontSize: 20, fontWeight: '700'},
                        styles.text,
                      ]}>
                      Max{' '}
                      {unit === '°C'
                        ? Math.floor(information.main.temp_max - 272.15)
                        : Math.floor(
                            (information.main.temp_max * 9) / 5 - 459.67,
                          )}
                      °
                    </Text>
                    <Text
                      style={[
                        {
                          color: '#fff',
                          marginLeft: 10,
                          fontSize: 20,
                          fontWeight: '700',
                        },
                        styles.text,
                      ]}>
                      Min{' '}
                      {unit === '°C'
                        ? Math.floor(information.main.temp_min - 272.15)
                        : Math.floor(
                            (information.main.temp_min * 9) / 5 - 459.67,
                          )}
                      °
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 16}}>
                    <Text
                      style={[
                        {color: '#fff', fontSize: 100, fontWeight: 'bold'},
                        styles.text,
                      ]}>
                      {unit === '°C'
                        ? Math.floor(information.main.temp - 272.15)
                        : Math.floor((information.main.temp * 9) / 5 - 459.67)}
                    </Text>
                    <Text
                      style={[
                        {
                          fontSize: 50,
                          color: '#fff',
                        },
                        styles.text,
                      ]}>
                      {unit}
                    </Text>
                  </View>
                  <Text
                    style={[
                      {color: '#fff', fontSize: 20, fontWeight: '700'},
                      styles.text,
                    ]}>
                    Feels like{' '}
                    {unit === '°C'
                      ? Math.floor(information.main.feels_like - 272.15)
                      : Math.floor(
                          (information.main.feels_like * 9) / 5 - 459.67,
                        )}
                    °
                  </Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <Image
                    style={{width: 150, height: 150}}
                    source={{
                      uri: `http://openweathermap.org/img/wn/${information.weather[0].icon}@2x.png`,
                    }}
                  />
                  <Text
                    style={[
                      {
                        color: '#fff',
                        fontSize: 30,
                        fontWeight: '700',
                      },
                      styles.text,
                    ]}>
                    {information.weather[0].main}
                  </Text>
                  <Text
                    style={[
                      {color: '#fff', fontSize: 20, fontWeight: '700'},
                      styles.text,
                    ]}>
                    {information.weather[0].description}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{}}>
              <View style={styles.sectionView}>
                <Table title="Temperature details" arrKey={[]} arrValue={[]} />
              </View>
              <View style={styles.sectionView}>
                <Table title="Wind" arrKey={[]} arrValue={[]} />
              </View>
              <View style={styles.sectionView}>
                <Table title="Clouds" arrKey={[]} arrValue={[]} />
              </View>
              <View style={styles.sectionView}>
                <Table title="Visibility" arrKey={[]} arrValue={[]} />
              </View>
              <View style={styles.sectionView}>
                <Table
                  title="More informations"
                  arrKey={[
                    'City',
                    'Country',
                    'Current Time',
                    'Sunrise',
                    'Sunset',
                    'Coordinate.Lat',
                    'Coordinate.Lon',
                  ]}
                  arrValue={informationArr}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </MenuDrawer>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66b3ff',
  },
  header: {
    marginTop: 5,
    borderRadius: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  // scrollView: {
  //   backgroundColor: '#66b3ff',
  // },
  mainWeather: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around',
  },
  sectionView: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  insectionView: {
    marginVertical: 20,
    marginTop: 10,
  },
  column: {
    width: Math.floor((3 * ScreenWidth) / 8),
    flexDirection: 'column',
  },
  row: {marginVertical: 5},
  text: {
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 4,
    shadowOpacity: 0.25,
    textShadowColor: '#000',
  },
});
