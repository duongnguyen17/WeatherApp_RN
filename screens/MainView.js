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
import {AreaChart} from 'react-native-svg-charts';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import MenuDrawer from 'react-native-side-drawer';
import {useHeaderHeight} from '@react-navigation/stack';
import {getByName} from '../backend/index';
import Table from '../components/Table';
export const ScreenWidth = Math.floor(Dimensions.get('screen').width);
export const ScreenHeight = Math.floor(Dimensions.get('screen').height);

const Gradient = ({index, data}) => (
  <Defs key={index}>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      {data.map((value, index) => {
        return (
          <Text
            key={index}
            style={{...styles.text, fontSize: 16, color: '#fff'}}>
            {value}°
          </Text>
        );
      })}
    </View>
    <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
      <Stop offset={'0%'} stopColor={'#d9d9d9'} stopOpacity={1} />
      <Stop offset={'50%'} stopColor={'#99ddff'} stopOpacity={0.01} />
    </LinearGradient>
  </Defs>
);

const MainView = props => {
  const [unit, setUnit] = useState('°C');
  const input = useRef('Hà Nội');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [information, setInformation] = useState({
    cod: '200',
    message: 0,
    cnt: 10,
    list: [
      {
        dt: 1621101600,
        main: {
          temp: 301.15,
          feels_like: 307.62,
          temp_min: 300.25,
          temp_max: 301.15,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1002,
          humidity: 94,
          temp_kf: 0.9,
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03n',
          },
        ],
        clouds: {
          all: 40,
        },
        wind: {
          speed: 5.01,
          deg: 152,
          gust: 10.62,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-15 18:00:00',
      },
      {
        dt: 1621112400,
        main: {
          temp: 300.84,
          feels_like: 306.24,
          temp_min: 300.22,
          temp_max: 300.84,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1002,
          humidity: 92,
          temp_kf: 0.62,
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03n',
          },
        ],
        clouds: {
          all: 44,
        },
        wind: {
          speed: 3.92,
          deg: 151,
          gust: 8.4,
        },
        visibility: 10000,
        pop: 0.01,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-15 21:00:00',
      },
      {
        dt: 1621123200,
        main: {
          temp: 301.24,
          feels_like: 306.82,
          temp_min: 301.24,
          temp_max: 301.29,
          pressure: 1006,
          sea_level: 1006,
          grnd_level: 1005,
          humidity: 88,
          temp_kf: -0.05,
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04d',
          },
        ],
        clouds: {
          all: 52,
        },
        wind: {
          speed: 3.83,
          deg: 149,
          gust: 6.16,
        },
        visibility: 10000,
        pop: 0.18,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-16 00:00:00',
      },
      {
        dt: 1621134000,
        main: {
          temp: 304.61,
          feels_like: 311.68,
          temp_min: 304.61,
          temp_max: 304.61,
          pressure: 1006,
          sea_level: 1006,
          grnd_level: 1005,
          humidity: 69,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d',
          },
        ],
        clouds: {
          all: 86,
        },
        wind: {
          speed: 4.17,
          deg: 159,
          gust: 5.46,
        },
        visibility: 10000,
        pop: 0.09,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-16 03:00:00',
      },
      {
        dt: 1621144800,
        main: {
          temp: 309.7,
          feels_like: 317.72,
          temp_min: 309.7,
          temp_max: 309.7,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 1002,
          humidity: 50,
          temp_kf: 0,
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d',
          },
        ],
        clouds: {
          all: 63,
        },
        wind: {
          speed: 2.85,
          deg: 179,
          gust: 4.19,
        },
        visibility: 10000,
        pop: 0.23,
        rain: {
          '3h': 0.14,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-16 06:00:00',
      },
      {
        dt: 1621155600,
        main: {
          temp: 308.62,
          feels_like: 317.17,
          temp_min: 308.62,
          temp_max: 308.62,
          pressure: 1001,
          sea_level: 1001,
          grnd_level: 1000,
          humidity: 55,
          temp_kf: 0,
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03d',
          },
        ],
        clouds: {
          all: 33,
        },
        wind: {
          speed: 5.49,
          deg: 123,
          gust: 5.22,
        },
        visibility: 10000,
        pop: 0.43,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-16 09:00:00',
      },
      {
        dt: 1621166400,
        main: {
          temp: 300.85,
          feels_like: 305.66,
          temp_min: 300.85,
          temp_max: 300.85,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 1002,
          humidity: 88,
          temp_kf: 0,
        },
        weather: [
          {
            id: 501,
            main: 'Rain',
            description: 'moderate rain',
            icon: '10n',
          },
        ],
        clouds: {
          all: 59,
        },
        wind: {
          speed: 3.5,
          deg: 99,
          gust: 6.84,
        },
        visibility: 10000,
        pop: 0.91,
        rain: {
          '3h': 6.35,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-16 12:00:00',
      },
      {
        dt: 1621177200,
        main: {
          temp: 300.6,
          feels_like: 305.2,
          temp_min: 300.6,
          temp_max: 300.6,
          pressure: 1006,
          sea_level: 1006,
          grnd_level: 1004,
          humidity: 90,
          temp_kf: 0,
        },
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10n',
          },
        ],
        clouds: {
          all: 100,
        },
        wind: {
          speed: 3.47,
          deg: 133,
          gust: 7.1,
        },
        visibility: 10000,
        pop: 0.53,
        rain: {
          '3h': 0.66,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-16 15:00:00',
      },
      {
        dt: 1621188000,
        main: {
          temp: 300.12,
          feels_like: 304.11,
          temp_min: 300.12,
          temp_max: 300.12,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1004,
          humidity: 93,
          temp_kf: 0,
        },
        weather: [
          {
            id: 803,
            main: 'Clouds',
            description: 'broken clouds',
            icon: '04n',
          },
        ],
        clouds: {
          all: 80,
        },
        wind: {
          speed: 4.03,
          deg: 144,
          gust: 9.34,
        },
        visibility: 10000,
        pop: 0.41,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-16 18:00:00',
      },
      {
        dt: 1621198800,
        main: {
          temp: 299.7,
          feels_like: 299.7,
          temp_min: 299.7,
          temp_max: 299.7,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1003,
          humidity: 94,
          temp_kf: 0,
        },
        weather: [
          {
            id: 802,
            main: 'Clouds',
            description: 'scattered clouds',
            icon: '03n',
          },
        ],
        clouds: {
          all: 28,
        },
        wind: {
          speed: 3.42,
          deg: 144,
          gust: 9.11,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-16 21:00:00',
      },
    ],
    city: {
      id: 1581130,
      name: 'Hanoi',
      coord: {
        lat: 21.0245,
        lon: 105.8412,
      },
      country: 'VN',
      population: 1431270,
      timezone: 25200,
      sunrise: 1621030747,
      sunset: 1621078021,
    },
  });

  const [drawer, setDrawer] = useState(false);
  const [dataChart, setDataChart] = useState(() => {
    let arr = [];
    if (unit === '°C') {
      for (var i = 1; i < 9; ++i) {
        arr.push(Math.floor(information.list[i].main.temp - 272.15));
      }
    } else {
      for (var i = 1; i < 9; ++i) {
        arr.push(Math.floor((information.list[i].main.temp * 9) / 5 - 459.67));
      }
    }

    return arr;
  });

  const [dataTime, setDataTime] = useState(() => {
    let arr = [];
    for (var i = 1; i < 9; ++i) {
      arr.push({
        icon: information.list[i].weather[0].icon,
        time: information.list[i].dt_txt.slice(11, 16),
      });
    }
    //console.log(`arr`, arr);
    return arr;
  });

  const [selectedTime, setSelectedTime] = useState(0);
  const [arrValTemp, setArrValTemp] = useState([]);
  const [arrValWind, setArrValWind] = useState([]);
  const [arrValClound, setArrValClound] = useState([]);
  const [arrValVisibility, setArrValVisibility] = useState([]);
  const [arrValInfor, setArrValInfor] = useState([]);

  useEffect(() => {
    getInformaiton();
  }, []);
  useEffect(() => {
    setDataChart(() => {
      let arr = [];
      if (unit === '°C') {
        for (var i = 1; i < 9; ++i) {
          arr.push(Math.floor(information.list[i].main.temp - 272.15));
        }
      } else {
        for (var i = 1; i < 9; ++i) {
          arr.push(
            Math.floor((information.list[i].main.temp * 9) / 5 - 459.67),
          );
        }
      }

      return arr;
    });
    setDataTime(() => {
      let arr = [];
      for (var i = 1; i < 9; ++i) {
        arr.push({
          icon: information.list[i].weather[0].icon,
          time: information.list[i].dt_txt.slice(11, 16),
        });
      }
      //console.log(`arr`, arr);
      return arr;
    });
  }, [unit, information]);

  useEffect(() => {
    setArrValTemp(setInforTemp);
    setArrValWind([
      information.list[selectedTime + 1].wind.speed + ' m/s',
      information.list[selectedTime + 1].wind.deg,
      information.list[selectedTime + 1].wind.gust + ' m/s',
    ]);
    setArrValClound([information.list[selectedTime + 1].clouds.all + ' %']);
    setArrValVisibility([
      information.list[selectedTime + 1].visibility
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' m',
    ]);
    //console.log(`arrValTemp`, arrValTemp);
  }, [information, selectedTime, unit]);
  useEffect(() => {
    setArrValInfor([
      information.city.name,
      information.city.country,
      information.city.coord.lat,
      information.city.coord.lon,
    ]);
  }, [information]);
  const setInforTemp = () => {
    if (unit === '°C') {
      return [
        Number.parseFloat(
          information.list[selectedTime + 1].main.temp - 272.15,
        ).toFixed(1) + ' °',
        Number.parseFloat(
          information.list[selectedTime + 1].main.feels_like - 272.15,
        ).toFixed(1) + ' °',
        Number.parseFloat(
          information.list[selectedTime + 1].main.temp_min - 272.15,
        ).toFixed(1) + ' °',
        Number.parseFloat(
          information.list[selectedTime + 1].main.temp_max - 272.15,
        ).toFixed(1) + ' °',
        information.list[selectedTime + 1].main.pressure
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' hPa',
        information.list[selectedTime + 1].main.sea_level
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' hPa',
        information.list[selectedTime + 1].main.humidity + ' %',
      ];
    } else {
      return [
        Number.parseFloat(
          (information.list[selectedTime + 1].main.temp * 9) / 5 - 459.67,
        ).toFixed(1) + ' °',
        Number.parseFloat(
          (information.list[selectedTime + 1].main.feels_like * 9) / 5 - 459.67,
        ).toFixed(1) + ' °',
        Number.parseFloat(
          (information.list[selectedTime + 1].main.temp_min * 9) / 5 - 459.67,
        ).toFixed(1) + ' °',
        Number.parseFloat(
          (information.list[selectedTime + 1].main.temp_max * 9) / 5 - 459.67,
        ).toFixed(1) + ' °',
        information.list[selectedTime + 1].main.pressure
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' hPa',
        information.list[selectedTime + 1].main.sea_level
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' hPa',
        information.list[selectedTime + 1].main.humidity + ' %',
      ];
    }
  };
  async function getInformaiton() {
    const result = await getByName(input.current);
    //console.log('infor', result);
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
            // console.log(`drawer`, drawer);
            Keyboard.dismiss();
          }}
          style={{}}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }>
            <View
              style={{
                height: ScreenHeight - 120,
                backgroundColor: '#66b3ff',
                justifyContent: 'space-between',
              }}>
              <Text style={{position: 'absolute'}}>{error}</Text>
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
                        ? Math.floor(information.list[1].main.temp_max - 272.15)
                        : Math.floor(
                            (information.list[1].main.temp_max * 9) / 5 -
                              459.67,
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
                        ? Math.floor(information.list[1].main.temp_min - 272.15)
                        : Math.floor(
                            (information.list[1].main.temp_min * 9) / 5 -
                              459.67,
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
                        ? Math.floor(information.list[1].main.temp - 272.15)
                        : Math.floor(
                            (information.list[1].main.temp * 9) / 5 - 459.67,
                          )}
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
                      ? Math.floor(information.list[1].main.feels_like - 272.15)
                      : Math.floor(
                          (information.list[1].main.feels_like * 9) / 5 -
                            459.67,
                        )}
                    °
                  </Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <Image
                    style={{width: 150, height: 150}}
                    source={{
                      uri: `http://openweathermap.org/img/wn/${information.list[1].weather[0].icon}@2x.png`,
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
                    {information.list[1].weather[0].main}
                  </Text>
                  <Text
                    style={[
                      {color: '#fff', fontSize: 20, fontWeight: '700'},
                      styles.text,
                    ]}>
                    {information.list[1].weather[0].description}
                  </Text>
                </View>
              </View>
              <View style={{}}>
                <ScrollView horizontal={true} style={{}}>
                  <View
                    style={{
                      flexDirection: 'column',
                      width: 730,
                      marginHorizontal: 10,
                    }}>
                    <AreaChart
                      style={{height: 100}}
                      data={dataChart}
                      contentInset={{top: 20, bottom: 20}}
                      svg={{fill: 'url(#gradient)'}}>
                      <Gradient />
                    </AreaChart>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                      }}>
                      {dataTime.map((value, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                index === selectedTime ? '#0099e6' : null,
                              width: 60,
                              height: 120,
                              justifyContent: 'space-around',
                              alignItems: 'center',
                              borderRadius: 5,
                            }}
                            onPress={() => {
                              setSelectedTime(index);
                            }}>
                            <Image
                              style={{width: 60, height: 60}}
                              source={{
                                uri: `http://openweathermap.org/img/wn/${value.icon}@2x.png`,
                              }}
                            />
                            <Text
                              style={{
                                ...styles.text,
                                color: '#fff',
                                fontSize: 16,
                              }}>
                              {value.time}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>

            <View style={{marginTop: 50, marginBottom: 10}}>
              <View style={styles.sectionView}>
                <Table
                  title="Temperature details"
                  arrKey={[
                    'Temp',
                    'Feell like',
                    'Temp min',
                    'Temp max',
                    'Pressure',
                    'Sea levle',
                    'Humidity',
                  ]}
                  arrValue={arrValTemp}
                />
              </View>
              <View style={styles.sectionView}>
                <Table
                  title="Wind"
                  arrKey={['Speed', 'Direction', 'Gust']}
                  arrValue={arrValWind}
                />
              </View>
              <View style={styles.sectionView}>
                <Table
                  title="Clouds"
                  arrKey={['Cloudiness']}
                  arrValue={arrValClound}
                />
              </View>
              <View style={styles.sectionView}>
                <Table
                  title="Visibility"
                  arrKey={['Visibility']}
                  arrValue={arrValVisibility}
                />
              </View>
              <View style={styles.sectionView}>
                <Table
                  title="More informations"
                  arrKey={[
                    'City',
                    'Country',
                    'Coordinate.Lat',
                    'Coordinate.Lon',
                  ]}
                  arrValue={arrValInfor}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </MenuDrawer>
    </SafeAreaView>
  );
};
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
    borderRadius: 5,
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

export default MainView;
