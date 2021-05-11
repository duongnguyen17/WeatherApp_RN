import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {block} from 'react-native-reanimated';
import Octicons from 'react-native-vector-icons/Octicons';
import {getByName} from '../backend/index';
import Table from '../components/Table';
export const ScreenWidth = Math.floor(Dimensions.get('screen').width);
export const ScreenHeight = Math.floor(Dimensions.get('screen').height);
export default function MainView(props) {
  const [navigation, setNavigation] = useState(props.navigation);
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
  const [unit, setUnit] = useState('°C');
  const [city, setCity] = useState('Hà Nội');
  const [input, setInput] = useState('Hà Nội');
  const [informationArr, setInformationArr] = useState([]);

  async function getInformaiton() {
    const result = await getByName(city);
    setInformation(result);
  }
  const changeCity = () => {
    setCity(input);
  };

  useEffect(() => {
    getInformaiton();
    //console.log('infor', information);
  }, [city]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{marginLeft: 10}}>
          <Octicons name="three-bars" size={26} color="#a6a6a6" />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View>
          <TextInput
            placeholder="Search place"
            defaultValue={city}
            onChangeText={text => {
              setInput(text);
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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}>
        <ScrollView>
          <View
            style={{height: ScreenHeight - 128, backgroundColor: '#66b3ff'}}>
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
                <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
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
                <Text style={{color: '#fff', fontSize: 30, fontWeight: '700'}}>
                  {information.weather[0].main}
                </Text>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
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
