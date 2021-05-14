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

export default function MainView(props) {
  const [unit, setUnit] = useState('°C');
  const input = useRef('Hà Nội');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [information, setInformation] = useState({
    cod: '200',
    message: 0,
    cnt: 40,
    list: [
      {
        dt: 1620972000,
        main: {
          temp: 305.68,
          feels_like: 313.61,
          temp_min: 305.68,
          temp_max: 308.75,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1001,
          humidity: 66,
          temp_kf: -3.07,
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
          all: 43,
        },
        wind: {
          speed: 5.19,
          deg: 177,
          gust: 6,
        },
        visibility: 10000,
        pop: 0.11,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-14 06:00:00',
      },
      {
        dt: 1620982800,
        main: {
          temp: 306.58,
          feels_like: 314.17,
          temp_min: 306.58,
          temp_max: 307.8,
          pressure: 1002,
          sea_level: 1002,
          grnd_level: 999,
          humidity: 61,
          temp_kf: -1.22,
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
          all: 26,
        },
        wind: {
          speed: 6.31,
          deg: 145,
          gust: 6.79,
        },
        visibility: 10000,
        pop: 0.15,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-14 09:00:00',
      },
      {
        dt: 1620993600,
        main: {
          temp: 302.01,
          feels_like: 307.09,
          temp_min: 302.01,
          temp_max: 302.01,
          pressure: 1002,
          sea_level: 1002,
          grnd_level: 1001,
          humidity: 78,
          temp_kf: 0,
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02n',
          },
        ],
        clouds: {
          all: 21,
        },
        wind: {
          speed: 6,
          deg: 149,
          gust: 11.05,
        },
        visibility: 10000,
        pop: 0.34,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-14 12:00:00',
      },
      {
        dt: 1621004400,
        main: {
          temp: 301.08,
          feels_like: 305.53,
          temp_min: 301.08,
          temp_max: 301.08,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 1003,
          humidity: 83,
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
          all: 55,
        },
        wind: {
          speed: 6.62,
          deg: 154,
          gust: 13.61,
        },
        visibility: 10000,
        pop: 0.25,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-14 15:00:00',
      },
      {
        dt: 1621015200,
        main: {
          temp: 300.45,
          feels_like: 304.51,
          temp_min: 300.45,
          temp_max: 300.45,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 1002,
          humidity: 88,
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
          all: 63,
        },
        wind: {
          speed: 4.54,
          deg: 149,
          gust: 10.09,
        },
        visibility: 10000,
        pop: 0.17,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-14 18:00:00',
      },
      {
        dt: 1621026000,
        main: {
          temp: 299.9,
          feels_like: 303.36,
          temp_min: 299.9,
          temp_max: 299.9,
          pressure: 1003,
          sea_level: 1003,
          grnd_level: 1002,
          humidity: 92,
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
          all: 39,
        },
        wind: {
          speed: 3.72,
          deg: 141,
          gust: 8.53,
        },
        visibility: 10000,
        pop: 0.03,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-14 21:00:00',
      },
      {
        dt: 1621036800,
        main: {
          temp: 301.19,
          feels_like: 306.33,
          temp_min: 301.19,
          temp_max: 301.19,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1003,
          humidity: 86,
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
          all: 43,
        },
        wind: {
          speed: 5.23,
          deg: 164,
          gust: 8.52,
        },
        visibility: 10000,
        pop: 0.03,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-15 00:00:00',
      },
      {
        dt: 1621047600,
        main: {
          temp: 306.24,
          feels_like: 313.64,
          temp_min: 306.24,
          temp_max: 306.24,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1003,
          humidity: 62,
          temp_kf: 0,
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
          all: 51,
        },
        wind: {
          speed: 4.83,
          deg: 177,
          gust: 6.02,
        },
        visibility: 10000,
        pop: 0.1,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-15 03:00:00',
      },
      {
        dt: 1621058400,
        main: {
          temp: 309.91,
          feels_like: 316.84,
          temp_min: 309.91,
          temp_max: 309.91,
          pressure: 1002,
          sea_level: 1002,
          grnd_level: 1001,
          humidity: 47,
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
          all: 28,
        },
        wind: {
          speed: 5.03,
          deg: 178,
          gust: 5.74,
        },
        visibility: 10000,
        pop: 0.06,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-15 06:00:00',
      },
      {
        dt: 1621069200,
        main: {
          temp: 308.85,
          feels_like: 316.87,
          temp_min: 308.85,
          temp_max: 308.85,
          pressure: 1000,
          sea_level: 1000,
          grnd_level: 998,
          humidity: 53,
          temp_kf: 0,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d',
          },
        ],
        clouds: {
          all: 5,
        },
        wind: {
          speed: 6.6,
          deg: 144,
          gust: 6.83,
        },
        visibility: 10000,
        pop: 0.09,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-15 09:00:00',
      },
      {
        dt: 1621080000,
        main: {
          temp: 302.84,
          feels_like: 308.37,
          temp_min: 302.84,
          temp_max: 302.84,
          pressure: 1002,
          sea_level: 1002,
          grnd_level: 1001,
          humidity: 74,
          temp_kf: 0,
        },
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02n',
          },
        ],
        clouds: {
          all: 14,
        },
        wind: {
          speed: 6.02,
          deg: 145,
          gust: 10.34,
        },
        visibility: 10000,
        pop: 0.28,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-15 12:00:00',
      },
      {
        dt: 1621090800,
        main: {
          temp: 300.94,
          feels_like: 305.46,
          temp_min: 300.94,
          temp_max: 300.94,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 1003,
          humidity: 85,
          temp_kf: 0,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01n',
          },
        ],
        clouds: {
          all: 1,
        },
        wind: {
          speed: 5.8,
          deg: 152,
          gust: 12.7,
        },
        visibility: 10000,
        pop: 0.15,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-15 15:00:00',
      },
      {
        dt: 1621101600,
        main: {
          temp: 300.52,
          feels_like: 304.7,
          temp_min: 300.52,
          temp_max: 300.52,
          pressure: 1003,
          sea_level: 1003,
          grnd_level: 1001,
          humidity: 88,
          temp_kf: 0,
        },
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01n',
          },
        ],
        clouds: {
          all: 8,
        },
        wind: {
          speed: 4.81,
          deg: 149,
          gust: 10.1,
        },
        visibility: 10000,
        pop: 0.05,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-15 18:00:00',
      },
      {
        dt: 1621112400,
        main: {
          temp: 300.24,
          feels_like: 304.14,
          temp_min: 300.24,
          temp_max: 300.24,
          pressure: 1003,
          sea_level: 1003,
          grnd_level: 1001,
          humidity: 90,
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
          all: 71,
        },
        wind: {
          speed: 3.8,
          deg: 150,
          gust: 8.49,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-15 21:00:00',
      },
      {
        dt: 1621123200,
        main: {
          temp: 301.52,
          feels_like: 307.3,
          temp_min: 301.52,
          temp_max: 301.52,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1004,
          humidity: 86,
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
          all: 65,
        },
        wind: {
          speed: 3.31,
          deg: 157,
          gust: 5.87,
        },
        visibility: 10000,
        pop: 0.29,
        rain: {
          '3h': 0.23,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-16 00:00:00',
      },
      {
        dt: 1621134000,
        main: {
          temp: 304.42,
          feels_like: 312.13,
          temp_min: 304.42,
          temp_max: 304.42,
          pressure: 1006,
          sea_level: 1006,
          grnd_level: 1004,
          humidity: 72,
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
          all: 82,
        },
        wind: {
          speed: 3.49,
          deg: 159,
          gust: 4.56,
        },
        visibility: 10000,
        pop: 0.28,
        rain: {
          '3h': 0.21,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-16 03:00:00',
      },
      {
        dt: 1621144800,
        main: {
          temp: 310.23,
          feels_like: 318.13,
          temp_min: 310.23,
          temp_max: 310.23,
          pressure: 1003,
          sea_level: 1003,
          grnd_level: 1001,
          humidity: 48,
          temp_kf: 0,
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
          all: 61,
        },
        wind: {
          speed: 2.74,
          deg: 170,
          gust: 4.05,
        },
        visibility: 10000,
        pop: 0.19,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-16 06:00:00',
      },
      {
        dt: 1621155600,
        main: {
          temp: 309.21,
          feels_like: 317.85,
          temp_min: 309.21,
          temp_max: 309.21,
          pressure: 1001,
          sea_level: 1001,
          grnd_level: 999,
          humidity: 53,
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
          all: 27,
        },
        wind: {
          speed: 5.87,
          deg: 136,
          gust: 6.11,
        },
        visibility: 10000,
        pop: 0.07,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-16 09:00:00',
      },
      {
        dt: 1621166400,
        main: {
          temp: 302.92,
          feels_like: 309.33,
          temp_min: 302.92,
          temp_max: 302.92,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 1002,
          humidity: 77,
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
          all: 26,
        },
        wind: {
          speed: 5.04,
          deg: 120,
          gust: 8.81,
        },
        visibility: 10000,
        pop: 0.51,
        rain: {
          '3h': 1.78,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-16 12:00:00',
      },
      {
        dt: 1621177200,
        main: {
          temp: 301.14,
          feels_like: 306.52,
          temp_min: 301.14,
          temp_max: 301.14,
          pressure: 1006,
          sea_level: 1006,
          grnd_level: 1004,
          humidity: 88,
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
          speed: 4.17,
          deg: 143,
          gust: 8.41,
        },
        visibility: 10000,
        pop: 0.44,
        rain: {
          '3h': 0.14,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-16 15:00:00',
      },
      {
        dt: 1621188000,
        main: {
          temp: 300.69,
          feels_like: 305.62,
          temp_min: 300.69,
          temp_max: 300.69,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1004,
          humidity: 91,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04n',
          },
        ],
        clouds: {
          all: 96,
        },
        wind: {
          speed: 4.06,
          deg: 152,
          gust: 9.59,
        },
        visibility: 10000,
        pop: 0.31,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-16 18:00:00',
      },
      {
        dt: 1621198800,
        main: {
          temp: 300.04,
          feels_like: 303.87,
          temp_min: 300.04,
          temp_max: 300.04,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1003,
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
          all: 66,
        },
        wind: {
          speed: 2.57,
          deg: 114,
          gust: 5.89,
        },
        visibility: 10000,
        pop: 0.13,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-16 21:00:00',
      },
      {
        dt: 1621209600,
        main: {
          temp: 301.51,
          feels_like: 307.47,
          temp_min: 301.51,
          temp_max: 301.51,
          pressure: 1007,
          sea_level: 1007,
          grnd_level: 1005,
          humidity: 87,
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
          all: 75,
        },
        wind: {
          speed: 3.34,
          deg: 127,
          gust: 6.21,
        },
        visibility: 10000,
        pop: 0.32,
        rain: {
          '3h': 0.35,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-17 00:00:00',
      },
      {
        dt: 1621220400,
        main: {
          temp: 304.16,
          feels_like: 311.71,
          temp_min: 304.16,
          temp_max: 304.16,
          pressure: 1007,
          sea_level: 1007,
          grnd_level: 1006,
          humidity: 73,
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
          all: 99,
        },
        wind: {
          speed: 3.17,
          deg: 150,
          gust: 4.32,
        },
        visibility: 10000,
        pop: 0.78,
        rain: {
          '3h': 0.57,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-17 03:00:00',
      },
      {
        dt: 1621231200,
        main: {
          temp: 305.95,
          feels_like: 313.99,
          temp_min: 305.95,
          temp_max: 305.95,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1004,
          humidity: 65,
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
          all: 97,
        },
        wind: {
          speed: 3.97,
          deg: 132,
          gust: 4.34,
        },
        visibility: 10000,
        pop: 0.81,
        rain: {
          '3h': 2,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-17 06:00:00',
      },
      {
        dt: 1621242000,
        main: {
          temp: 304.38,
          feels_like: 311.69,
          temp_min: 304.38,
          temp_max: 304.38,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 1003,
          humidity: 71,
          temp_kf: 0,
        },
        weather: [
          {
            id: 501,
            main: 'Rain',
            description: 'moderate rain',
            icon: '10d',
          },
        ],
        clouds: {
          all: 94,
        },
        wind: {
          speed: 3.88,
          deg: 115,
          gust: 5.18,
        },
        visibility: 10000,
        pop: 0.82,
        rain: {
          '3h': 5.34,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-17 09:00:00',
      },
      {
        dt: 1621252800,
        main: {
          temp: 300.12,
          feels_like: 303.8,
          temp_min: 300.12,
          temp_max: 300.12,
          pressure: 1006,
          sea_level: 1006,
          grnd_level: 1004,
          humidity: 90,
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
          all: 97,
        },
        wind: {
          speed: 3.56,
          deg: 117,
          gust: 7.72,
        },
        visibility: 10000,
        pop: 0.9,
        rain: {
          '3h': 10.04,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-17 12:00:00',
      },
      {
        dt: 1621263600,
        main: {
          temp: 299.93,
          feels_like: 303.54,
          temp_min: 299.93,
          temp_max: 299.93,
          pressure: 1008,
          sea_level: 1008,
          grnd_level: 1006,
          humidity: 93,
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
          speed: 2.27,
          deg: 112,
          gust: 5.56,
        },
        visibility: 10000,
        pop: 0.62,
        rain: {
          '3h': 0.34,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-17 15:00:00',
      },
      {
        dt: 1621274400,
        main: {
          temp: 299.51,
          feels_like: 299.51,
          temp_min: 299.51,
          temp_max: 299.51,
          pressure: 1006,
          sea_level: 1006,
          grnd_level: 1005,
          humidity: 95,
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
          speed: 2.4,
          deg: 111,
          gust: 6,
        },
        visibility: 10000,
        pop: 0.61,
        rain: {
          '3h': 0.22,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-17 18:00:00',
      },
      {
        dt: 1621285200,
        main: {
          temp: 298.86,
          feels_like: 299.97,
          temp_min: 298.86,
          temp_max: 298.86,
          pressure: 1006,
          sea_level: 1006,
          grnd_level: 1005,
          humidity: 95,
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
          speed: 1.81,
          deg: 113,
          gust: 4.02,
        },
        visibility: 10000,
        pop: 0.66,
        rain: {
          '3h': 1.89,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-17 21:00:00',
      },
      {
        dt: 1621296000,
        main: {
          temp: 300.32,
          feels_like: 303.92,
          temp_min: 300.32,
          temp_max: 300.32,
          pressure: 1007,
          sea_level: 1007,
          grnd_level: 1006,
          humidity: 86,
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
          all: 96,
        },
        wind: {
          speed: 2.54,
          deg: 162,
          gust: 4.74,
        },
        visibility: 10000,
        pop: 0.56,
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-18 00:00:00',
      },
      {
        dt: 1621306800,
        main: {
          temp: 305.04,
          feels_like: 311.2,
          temp_min: 305.04,
          temp_max: 305.04,
          pressure: 1008,
          sea_level: 1008,
          grnd_level: 1007,
          humidity: 64,
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
          all: 23,
        },
        wind: {
          speed: 5.29,
          deg: 177,
          gust: 7.51,
        },
        visibility: 10000,
        pop: 0.47,
        rain: {
          '3h': 0.12,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-18 03:00:00',
      },
      {
        dt: 1621317600,
        main: {
          temp: 305.54,
          feels_like: 311.48,
          temp_min: 305.54,
          temp_max: 305.54,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1003,
          humidity: 61,
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
          all: 54,
        },
        wind: {
          speed: 5.34,
          deg: 171,
          gust: 7.85,
        },
        visibility: 10000,
        pop: 0.47,
        rain: {
          '3h': 0.27,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-18 06:00:00',
      },
      {
        dt: 1621328400,
        main: {
          temp: 304.88,
          feels_like: 310.8,
          temp_min: 304.88,
          temp_max: 304.88,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 1002,
          humidity: 64,
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
          all: 89,
        },
        wind: {
          speed: 5.86,
          deg: 161,
          gust: 8.74,
        },
        visibility: 10000,
        pop: 0.31,
        rain: {
          '3h': 0.13,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-18 09:00:00',
      },
      {
        dt: 1621339200,
        main: {
          temp: 301.58,
          feels_like: 306.17,
          temp_min: 301.58,
          temp_max: 301.58,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 1002,
          humidity: 79,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04n',
          },
        ],
        clouds: {
          all: 94,
        },
        wind: {
          speed: 6.19,
          deg: 142,
          gust: 11.02,
        },
        visibility: 10000,
        pop: 0.49,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-18 12:00:00',
      },
      {
        dt: 1621350000,
        main: {
          temp: 300.15,
          feels_like: 303.78,
          temp_min: 300.15,
          temp_max: 300.15,
          pressure: 1006,
          sea_level: 1006,
          grnd_level: 1004,
          humidity: 89,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04n',
          },
        ],
        clouds: {
          all: 100,
        },
        wind: {
          speed: 4.17,
          deg: 135,
          gust: 10.07,
        },
        visibility: 10000,
        pop: 0.36,
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-18 15:00:00',
      },
      {
        dt: 1621360800,
        main: {
          temp: 300.09,
          feels_like: 303.61,
          temp_min: 300.09,
          temp_max: 300.09,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1004,
          humidity: 89,
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
          all: 99,
        },
        wind: {
          speed: 4.26,
          deg: 154,
          gust: 9.72,
        },
        visibility: 10000,
        pop: 0.83,
        rain: {
          '3h': 1.23,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-18 18:00:00',
      },
      {
        dt: 1621371600,
        main: {
          temp: 299.51,
          feels_like: 299.51,
          temp_min: 299.51,
          temp_max: 299.51,
          pressure: 1004,
          sea_level: 1004,
          grnd_level: 1003,
          humidity: 93,
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
          speed: 4.24,
          deg: 152,
          gust: 10.6,
        },
        visibility: 10000,
        pop: 0.76,
        rain: {
          '3h': 0.37,
        },
        sys: {
          pod: 'n',
        },
        dt_txt: '2021-05-18 21:00:00',
      },
      {
        dt: 1621382400,
        main: {
          temp: 301.22,
          feels_like: 306.42,
          temp_min: 301.22,
          temp_max: 301.22,
          pressure: 1006,
          sea_level: 1006,
          grnd_level: 1004,
          humidity: 86,
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
          all: 97,
        },
        wind: {
          speed: 5.12,
          deg: 164,
          gust: 9.96,
        },
        visibility: 10000,
        pop: 0.76,
        rain: {
          '3h': 0.17,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-19 00:00:00',
      },
      {
        dt: 1621393200,
        main: {
          temp: 305.02,
          feels_like: 312.48,
          temp_min: 305.02,
          temp_max: 305.02,
          pressure: 1005,
          sea_level: 1005,
          grnd_level: 1004,
          humidity: 68,
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
          all: 76,
        },
        wind: {
          speed: 6.77,
          deg: 164,
          gust: 8.34,
        },
        visibility: 10000,
        pop: 0.78,
        rain: {
          '3h': 0.47,
        },
        sys: {
          pod: 'd',
        },
        dt_txt: '2021-05-19 03:00:00',
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
      sunrise: 1620944371,
      sunset: 1620991595,
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
    console.log(`arrValTemp`, arrValTemp);
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
          style={styles.container}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }>
            <View
              style={{
                height: ScreenHeight - 90,
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
                      width: 600,
                      marginHorizontal: 10,
                    }}>
                    <AreaChart
                      style={{height: 70}}
                      data={dataChart}
                      contentInset={{top: 20, bottom: 20}}
                      svg={{fill: 'url(#gradient)'}}>
                      <Gradient />
                    </AreaChart>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 30,
                      }}>
                      {dataTime.map((value, index) => {
                        return (
                          <TouchableOpacity
                            key={index}
                            style={{
                              backgroundColor:
                                index === selectedTime ? '#0099e6' : null,
                              width: 50,
                              height: 75,
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              borderRadius: 5,
                            }}
                            onPress={() => {
                              setSelectedTime(index);
                            }}>
                            <Image
                              style={{width: 30, height: 30}}
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

            <View style={{}}>
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
