import React, {
  useLayoutEffect,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => {
            setDrawer(true);
          }}>
          <Octicons name="three-bars" size={26} color="#a6a6a6" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View>
          <TextInput
            placeholder="Search place"
            defaultValue={input.current}
            onChangeText={text => {
              input.current = text;
            }}
          />
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}} onPress={changeCity}>
          <Octicons name="search" size={26} color="#a6a6a6" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const onRefresh = () => {
    setLoading(true);
    getInformaiton();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const drawerContent = useCallback(
    () => (
      <View style={{backgroundColor: '#fff', flex:1, padding:10}}>
        <View style={{height: 100, backgroundColor: '#99ccff'}}></View>
        <View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 30,
                backgroundColor: unit === '°C' ? 'gray' : '#fff',
              }}
              onPress={() => {
                setUnit('°C');
              }}>
              <Text>°C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 30,
                backgroundColor: unit === '°F' ? 'gray' : '#fff',
              }}
              onPress={() => {
                setUnit('°F');
              }}>
              <Text>°F</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ),
    [drawer],
  );
  return (
    <SafeAreaView style={styles.container}>
      <MenuDrawer
        open={drawer}
        drawerContent={drawerContent}
        drawerPercentage={80}
        opacity={0.7}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }>
            <View
              style={{
                height: ScreenHeight - HeaderHeight,
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
                      style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
                      Max{' '}
                      {unit === '°C'
                        ? Math.floor(information.main.temp_max - 272.15)
                        : Math.floor(information.main.temp_max - -457.87)}
                      °
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        marginLeft: 10,
                        fontSize: 20,
                        fontWeight: '700',
                      }}>
                      Min{' '}
                      {unit === '°C'
                        ? Math.floor(information.main.temp_min - 272.15)
                        : Math.floor(information.main.temp_min - -457.87)}
                      °
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', marginVertical: 16}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 100,
                        fontWeight: 'bold',
                      }}>
                      {unit === '°C'
                        ? Math.floor(information.main.temp - 272.15)
                        : Math.floor(information.main.temp - -457.87)}
                    </Text>
                    <Text style={{fontSize: 50, color: '#fff'}}>{unit}</Text>
                  </View>
                  <Text
                    style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
                    Feels like{' '}
                    {unit === '°C'
                      ? Math.floor(information.main.feels_like - 272.15)
                      : Math.floor(information.main.feels_like - -457.87)}
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
                    style={{color: '#fff', fontSize: 30, fontWeight: '700'}}>
                    {information.weather[0].main}
                  </Text>
                  <Text
                    style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
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
  },
  scrollView: {
    backgroundColor: '#66b3ff',
  },
  mainWeather: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around',
  },
  sectionView: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  insectionView: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  column: {
    width: Math.floor((3 * ScreenWidth) / 8),
    flexDirection: 'column',
  },
  row: {marginVertical: 5},
});
