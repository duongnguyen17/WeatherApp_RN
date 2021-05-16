import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ToastAndroid,
  RefreshControl,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AreaChart} from 'react-native-svg-charts';
import Gradient from '../components/Gradient';
// import MenuDrawer from 'react-native-side-drawer';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {
  getByName,
  getSavedCities,
  saveCity,
  deleteCity,
} from '../backend/index';
import Table from '../components/Table';
import TagDay from '../components/TagDay';
import Drawer from '../components/Drawer';
export const ScreenWidth = Math.floor(Dimensions.get('screen').width);
export const ScreenHeight = Math.floor(Dimensions.get('screen').height);

const MainView = props => {
  const [navigationState, setNavigationState] = useState({
    index: 0,
    routes: [
      {key: 'today', title: 'Today'},
      {key: 'future', title: '16 Days'},
    ],
  });
  const [unit, setUnit] = useState('°C');
  const input = useRef('Hà Nội');
  const [loading, setLoading] = useState(false);
  const [hourInfor, setHourInfor] = useState({
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

  const [dayInfor, setDayInfor] = useState({
    data: [
      {
        moonrise_ts: 1621126043,
        wind_cdir: 'SSE',
        rh: 77,
        pres: 1002.96,
        high_temp: 37.4,
        sunset_ts: 1621164572,
        ozone: 278.969,
        moon_phase: 0.200888,
        wind_gust_spd: 11.6094,
        snow_depth: 0,
        clouds: 55,
        ts: 1621098060,
        sunrise_ts: 1621117406,
        app_min_temp: 30.7,
        wind_spd: 4.10619,
        pop: 70,
        wind_cdir_full: 'south-southeast',
        slp: 1004.02,
        moon_phase_lunation: 0.14,
        valid_date: '2021-05-16',
        app_max_temp: 45,
        vis: 23.948,
        dewpt: 25.3,
        snow: 0,
        uv: 10.3867,
        weather: {
          icon: 't02d',
          code: 201,
          description: 'Thunderstorm with rain',
        },
        wind_dir: 152,
        max_dhi: null,
        clouds_hi: 29,
        precip: 7,
        low_temp: 26.7,
        max_temp: 38.1,
        moonset_ts: 1621178749,
        datetime: '2021-05-16',
        temp: 30.2,
        min_temp: 26.8,
        clouds_mid: 5,
        clouds_low: 31,
      },
      {
        moonrise_ts: 1621215459,
        wind_cdir: 'SSE',
        rh: 80,
        pres: 1004.54,
        high_temp: 33.4,
        sunset_ts: 1621250997,
        ozone: 282.115,
        moon_phase: 0.288656,
        wind_gust_spd: 10.2031,
        snow_depth: 0,
        clouds: 73,
        ts: 1621184460,
        sunrise_ts: 1621203784,
        app_min_temp: 27.8,
        wind_spd: 3.94972,
        pop: 55,
        wind_cdir_full: 'south-southeast',
        slp: 1005.58,
        moon_phase_lunation: 0.18,
        valid_date: '2021-05-17',
        app_max_temp: 41.7,
        vis: 23.473,
        dewpt: 25.5,
        snow: 0,
        uv: 5.81018,
        weather: {
          icon: 'c04d',
          code: 804,
          description: 'Overcast clouds',
        },
        wind_dir: 149,
        max_dhi: null,
        clouds_hi: 44,
        precip: 3.8125,
        low_temp: 25.5,
        max_temp: 33.6,
        moonset_ts: 1621268076,
        datetime: '2021-05-17',
        temp: 29.4,
        min_temp: 26.6,
        clouds_mid: 8,
        clouds_low: 47,
      },
      {
        moonrise_ts: 1621305061,
        wind_cdir: 'SSE',
        rh: 76,
        pres: 1004.12,
        high_temp: 33.4,
        sunset_ts: 1621337421,
        ozone: 278.833,
        moon_phase: 0.387526,
        wind_gust_spd: 10.0234,
        snow_depth: 0,
        clouds: 85,
        ts: 1621270860,
        sunrise_ts: 1621290164,
        app_min_temp: 26.5,
        wind_spd: 4.37142,
        pop: 20,
        wind_cdir_full: 'south-southeast',
        slp: 1005.21,
        moon_phase_lunation: 0.21,
        valid_date: '2021-05-18',
        app_max_temp: 40.3,
        vis: 23.94,
        dewpt: 24.2,
        snow: 0,
        uv: 6.35627,
        weather: {
          icon: 'c04d',
          code: 804,
          description: 'Overcast clouds',
        },
        wind_dir: 154,
        max_dhi: null,
        clouds_hi: 63,
        precip: 0.75,
        low_temp: 26.7,
        max_temp: 33.6,
        moonset_ts: 1621270830,
        datetime: '2021-05-18',
        temp: 29.1,
        min_temp: 25.3,
        clouds_mid: 18,
        clouds_low: 31,
      },
      {
        moonrise_ts: 1621394786,
        wind_cdir: 'SSE',
        rh: 79,
        pres: 1002.06,
        high_temp: 34.2,
        sunset_ts: 1621423846,
        ozone: 278.271,
        moon_phase: 0.494325,
        wind_gust_spd: 12.5156,
        snow_depth: 0,
        clouds: 94,
        ts: 1621357260,
        sunrise_ts: 1621376544,
        app_min_temp: 26,
        wind_spd: 4.89689,
        pop: 65,
        wind_cdir_full: 'south-southeast',
        slp: 1003.08,
        moon_phase_lunation: 0.24,
        valid_date: '2021-05-19',
        app_max_temp: 42.8,
        vis: 23.8733,
        dewpt: 25.1,
        snow: 0,
        uv: 3.8288,
        weather: {
          icon: 't02d',
          code: 201,
          description: 'Thunderstorm with rain',
        },
        wind_dir: 153,
        max_dhi: null,
        clouds_hi: 70,
        precip: 5.125,
        low_temp: 25.4,
        max_temp: 34.5,
        moonset_ts: 1621359817,
        datetime: '2021-05-19',
        temp: 29.3,
        min_temp: 25,
        clouds_mid: 11,
        clouds_low: 46,
      },
      {
        moonrise_ts: 1621484577,
        wind_cdir: 'S',
        rh: 75,
        pres: 1001.32,
        high_temp: 36.8,
        sunset_ts: 1621510270,
        ozone: 276.485,
        moon_phase: 0.604908,
        wind_gust_spd: 10.2188,
        snow_depth: 0,
        clouds: 79,
        ts: 1621443660,
        sunrise_ts: 1621462926,
        app_min_temp: 26.4,
        wind_spd: 3.07931,
        pop: 20,
        wind_cdir_full: 'south',
        slp: 1002.41,
        moon_phase_lunation: 0.28,
        valid_date: '2021-05-20',
        app_max_temp: 43.6,
        vis: 24.128,
        dewpt: 24.3,
        snow: 0,
        uv: 9.80006,
        weather: {
          icon: 'c04d',
          code: 804,
          description: 'Overcast clouds',
        },
        wind_dir: 178,
        max_dhi: null,
        clouds_hi: 75,
        precip: 0.1875,
        low_temp: 27.4,
        max_temp: 37.1,
        moonset_ts: 1621448671,
        datetime: '2021-05-20',
        temp: 29.6,
        min_temp: 24.9,
        clouds_mid: 23,
        clouds_low: 19,
      },
      {
        moonrise_ts: 1621574394,
        wind_cdir: 'SE',
        rh: 76,
        pres: 999.562,
        high_temp: 40.5,
        sunset_ts: 1621596695,
        ozone: 273,
        moon_phase: 0.71391,
        wind_gust_spd: 9.82812,
        snow_depth: 0,
        clouds: 95,
        ts: 1621530060,
        sunrise_ts: 1621549309,
        app_min_temp: 33.4,
        wind_spd: 2.88476,
        pop: 20,
        wind_cdir_full: 'southeast',
        slp: 1000.62,
        moon_phase_lunation: 0.31,
        valid_date: '2021-05-21',
        app_max_temp: 43.8,
        vis: 24.128,
        dewpt: 25.5,
        snow: 0,
        uv: 3.3152,
        weather: {
          icon: 'c04d',
          code: 804,
          description: 'Overcast clouds',
        },
        wind_dir: 140,
        max_dhi: null,
        clouds_hi: 86,
        precip: 0.1875,
        low_temp: 27.8,
        max_temp: 36.1,
        moonset_ts: 1621537451,
        datetime: '2021-05-21',
        temp: 30.6,
        min_temp: 27.8,
        clouds_mid: 62,
        clouds_low: 28,
      },
      {
        moonrise_ts: 1621664234,
        wind_cdir: 'SSE',
        rh: 66,
        pres: 997,
        high_temp: 38.4,
        sunset_ts: 1621683119,
        ozone: 272.75,
        moon_phase: 0.814727,
        wind_gust_spd: 12.9062,
        snow_depth: 0,
        clouds: 53,
        ts: 1621616460,
        sunrise_ts: 1621635692,
        app_min_temp: 33.2,
        wind_spd: 3.81079,
        pop: 0,
        wind_cdir_full: 'south-southeast',
        slp: 998.062,
        moon_phase_lunation: 0.34,
        valid_date: '2021-05-22',
        app_max_temp: 47,
        vis: 24.128,
        dewpt: 24.9,
        snow: 0,
        uv: 9.99422,
        weather: {
          icon: 'c03d',
          code: 803,
          description: 'Broken clouds',
        },
        wind_dir: 159,
        max_dhi: null,
        clouds_hi: 49,
        precip: 0,
        low_temp: 28.9,
        max_temp: 40.9,
        moonset_ts: 1621626230,
        datetime: '2021-05-22',
        temp: 32.8,
        min_temp: 27.4,
        clouds_mid: 5,
        clouds_low: 14,
      },
      {
        moonrise_ts: 1621754121,
        wind_cdir: 'SSE',
        rh: 67,
        pres: 1000.12,
        high_temp: 33.1,
        sunset_ts: 1621769544,
        ozone: 275.5,
        moon_phase: 0.899931,
        wind_gust_spd: 13.1016,
        snow_depth: 0,
        clouds: 89,
        ts: 1621702860,
        sunrise_ts: 1621722077,
        app_min_temp: 34.1,
        wind_spd: 3.46851,
        pop: 45,
        wind_cdir_full: 'south-southeast',
        slp: 1001.19,
        moon_phase_lunation: 0.38,
        valid_date: '2021-05-23',
        app_max_temp: 47.1,
        vis: 23.89,
        dewpt: 24.9,
        snow: 0,
        uv: 3.31198,
        weather: {
          icon: 'c04d',
          code: 804,
          description: 'Overcast clouds',
        },
        wind_dir: 163,
        max_dhi: null,
        clouds_hi: 88,
        precip: 2.375,
        low_temp: 26.5,
        max_temp: 39.1,
        moonset_ts: 1621715092,
        datetime: '2021-05-23',
        temp: 32.1,
        min_temp: 27.8,
        clouds_mid: 1,
        clouds_low: 12,
      },
      {
        moonrise_ts: 1621844104,
        wind_cdir: 'ENE',
        rh: 73,
        pres: 1005.75,
        high_temp: 35.5,
        sunset_ts: 1621855968,
        ozone: 278.906,
        moon_phase: 0.96217,
        wind_gust_spd: 9.32031,
        snow_depth: 0,
        clouds: 100,
        ts: 1621789260,
        sunrise_ts: 1621808463,
        app_min_temp: 27.4,
        wind_spd: 3.28952,
        pop: 70,
        wind_cdir_full: 'east-northeast',
        slp: 1006.88,
        moon_phase_lunation: 0.41,
        valid_date: '2021-05-24',
        app_max_temp: 37.8,
        vis: 23.986,
        dewpt: 23.7,
        snow: 0,
        uv: 3.30963,
        weather: {
          icon: 't02d',
          code: 201,
          description: 'Thunderstorm with rain',
        },
        wind_dir: 64,
        max_dhi: null,
        clouds_hi: 100,
        precip: 6.5625,
        low_temp: 25.7,
        max_temp: 33.1,
        moonset_ts: 1621804130,
        datetime: '2021-05-24',
        temp: 29.4,
        min_temp: 26.1,
        clouds_mid: 0,
        clouds_low: 53,
      },
      {
        moonrise_ts: 1621934234,
        wind_cdir: 'E',
        rh: 75,
        pres: 1005.4,
        high_temp: 38.4,
        sunset_ts: 1621942393,
        ozone: 278.55,
        moon_phase: 0.995419,
        wind_gust_spd: 3.51367,
        snow_depth: 0,
        clouds: 84,
        ts: 1621875660,
        sunrise_ts: 1621894850,
        app_min_temp: 26.5,
        wind_spd: 2.15889,
        pop: 60,
        wind_cdir_full: 'east',
        slp: 1006.5,
        moon_phase_lunation: 0.45,
        valid_date: '2021-05-25',
        app_max_temp: 38.4,
        vis: 20.3696,
        dewpt: 23.5,
        snow: 0,
        uv: 8.8329,
        weather: {
          icon: 'c04d',
          code: 804,
          description: 'Overcast clouds',
        },
        wind_dir: 82,
        max_dhi: null,
        clouds_hi: 80,
        precip: 4.1875,
        low_temp: 27.5,
        max_temp: 32.7,
        moonset_ts: 1621893432,
        datetime: '2021-05-25',
        temp: 28.5,
        min_temp: 25.4,
        clouds_mid: 0,
        clouds_low: 49,
      },
      {
        moonrise_ts: 1622024546,
        wind_cdir: 'S',
        rh: 71,
        pres: 1001.25,
        high_temp: 36.4,
        sunset_ts: 1622028817,
        ozone: 273.75,
        moon_phase: 0.996253,
        wind_gust_spd: 5.71094,
        snow_depth: 0,
        clouds: 62,
        ts: 1621962060,
        sunrise_ts: 1621981238,
        app_min_temp: 27.4,
        wind_spd: 2.16599,
        pop: 15,
        wind_cdir_full: 'south',
        slp: 1002.5,
        moon_phase_lunation: 0.48,
        valid_date: '2021-05-26',
        app_max_temp: 42.6,
        vis: 24.128,
        dewpt: 24.4,
        snow: 0,
        uv: 6.3793,
        weather: {
          icon: 'c03d',
          code: 803,
          description: 'Broken clouds',
        },
        wind_dir: 171,
        max_dhi: null,
        clouds_hi: 33,
        precip: 0.5,
        low_temp: 25.4,
        max_temp: 35.6,
        moonset_ts: 1621983063,
        datetime: '2021-05-26',
        temp: 31,
        min_temp: 26.4,
        clouds_mid: 0,
        clouds_low: 29,
      },
      {
        moonrise_ts: 1622115024,
        wind_cdir: 'SW',
        rh: 64,
        pres: 998.75,
        high_temp: 25.7,
        sunset_ts: 1622115241,
        ozone: 272.375,
        moon_phase: 0.964699,
        wind_gust_spd: 3.91602,
        snow_depth: 0,
        clouds: 73,
        ts: 1622048460,
        sunrise_ts: 1622067627,
        app_min_temp: 31.2,
        wind_spd: 1.28354,
        pop: 20,
        wind_cdir_full: 'southwest',
        slp: 1000,
        moon_phase_lunation: 0.51,
        valid_date: '2021-05-27',
        app_max_temp: 46.5,
        vis: 24.128,
        dewpt: 24.3,
        snow: 0,
        uv: 7.34637,
        weather: {
          icon: 'c04d',
          code: 804,
          description: 'Overcast clouds',
        },
        wind_dir: 220,
        max_dhi: null,
        clouds_hi: 51,
        precip: 0.1875,
        low_temp: 24.8,
        max_temp: 38.4,
        moonset_ts: 1622073020,
        datetime: '2021-05-27',
        temp: 32.9,
        min_temp: 27.5,
        clouds_mid: 0,
        clouds_low: 23,
      },
      {
        moonrise_ts: 1622205566,
        wind_cdir: 'S',
        rh: 63,
        pres: 995.75,
        high_temp: 34,
        sunset_ts: 1622201665,
        ozone: 274.125,
        moon_phase: 0.904327,
        wind_gust_spd: 3.39844,
        snow_depth: 0,
        clouds: 100,
        ts: 1622134860,
        sunrise_ts: 1622154017,
        app_min_temp: 35.4,
        wind_spd: 2.04377,
        pop: 55,
        wind_cdir_full: 'south',
        slp: 996.75,
        moon_phase_lunation: 0.55,
        valid_date: '2021-05-28',
        app_max_temp: 43.7,
        vis: 24.128,
        dewpt: 24.6,
        snow: 0,
        uv: 3.31351,
        weather: {
          icon: 'c04d',
          code: 804,
          description: 'Overcast clouds',
        },
        wind_dir: 176,
        max_dhi: null,
        clouds_hi: 100,
        precip: 3.4375,
        low_temp: 28,
        max_temp: 36.5,
        moonset_ts: 1622163208,
        datetime: '2021-05-28',
        temp: 33,
        min_temp: 28,
        clouds_mid: 1,
        clouds_low: 1,
      },
      {
        moonrise_ts: 1622295992,
        wind_cdir: 'SE',
        rh: 64,
        pres: 991.75,
        high_temp: 36.4,
        sunset_ts: 1622288089,
        ozone: 273.75,
        moon_phase: 0.904327,
        wind_gust_spd: 6.52734,
        snow_depth: 0,
        clouds: 100,
        ts: 1622221260,
        sunrise_ts: 1622240408,
        app_min_temp: 32.6,
        wind_spd: 3.30245,
        pop: 50,
        wind_cdir_full: 'southeast',
        slp: 992.75,
        moon_phase_lunation: 0.58,
        valid_date: '2021-05-29',
        app_max_temp: 41.3,
        vis: 24.128,
        dewpt: 23.6,
        snow: 0,
        uv: 3.31513,
        weather: {
          icon: 'c04d',
          code: 804,
          description: 'Overcast clouds',
        },
        wind_dir: 144,
        max_dhi: null,
        clouds_hi: 100,
        precip: 2.8125,
        low_temp: 25.2,
        max_temp: 36.4,
        moonset_ts: 1622249608,
        datetime: '2021-05-29',
        temp: 32.2,
        min_temp: 25.2,
        clouds_mid: 45,
        clouds_low: 3,
      },
      {
        moonrise_ts: 1622386113,
        wind_cdir: 'SE',
        rh: 89,
        pres: 993.25,
        high_temp: 26.1,
        sunset_ts: 1622374513,
        ozone: 272.375,
        moon_phase: 0.821429,
        wind_gust_spd: 13.7266,
        snow_depth: 0,
        clouds: 100,
        ts: 1622307660,
        sunrise_ts: 1622326800,
        app_min_temp: 26.4,
        wind_spd: 3.20415,
        pop: 95,
        wind_cdir_full: 'southeast',
        slp: 994.25,
        moon_phase_lunation: 0.61,
        valid_date: '2021-05-30',
        app_max_temp: 26.5,
        vis: 15.692,
        dewpt: 23.6,
        snow: 0,
        uv: 3.31771,
        weather: {
          icon: 't03d',
          code: 202,
          description: 'Thunderstorm with heavy rain',
        },
        wind_dir: 145,
        max_dhi: null,
        clouds_hi: 100,
        precip: 53.375,
        low_temp: 24.1,
        max_temp: 26.1,
        moonset_ts: 1622339858,
        datetime: '2021-05-30',
        temp: 25.5,
        min_temp: 24.1,
        clouds_mid: 100,
        clouds_low: 31,
      },
      {
        moonrise_ts: 1622475819,
        wind_cdir: 'W',
        rh: 69,
        pres: 995.25,
        high_temp: 34.6,
        sunset_ts: 1622460936,
        ozone: 272.75,
        moon_phase: 0.723548,
        wind_gust_spd: 9.10938,
        snow_depth: 0,
        clouds: 96,
        ts: 1622394060,
        sunrise_ts: 1622413193,
        app_min_temp: 25.6,
        wind_spd: 3.67291,
        pop: 0,
        wind_cdir_full: 'west',
        slp: 996.25,
        moon_phase_lunation: 0.65,
        valid_date: '2021-05-31',
        app_max_temp: 38.4,
        vis: 24.128,
        dewpt: 22.4,
        snow: 0,
        uv: 3.96686,
        weather: {
          icon: 'c04d',
          code: 804,
          description: 'Overcast clouds',
        },
        wind_dir: 259,
        max_dhi: null,
        clouds_hi: 58,
        precip: 0,
        low_temp: 25.9,
        max_temp: 34.6,
        moonset_ts: 1622430006,
        datetime: '2021-05-31',
        temp: 29.3,
        min_temp: 24.8,
        clouds_mid: 96,
        clouds_low: 5,
      },
    ],
    city_name: 'Ha Noi',
    lon: '105.84117',
    timezone: 'Asia/Ho_Chi_Minh',
    lat: '21.0245',
    country_code: 'VN',
    state_code: '44',
  });

  const [dataChart, setDataChart] = useState(() => {
    let arr = [];
    if (unit === '°C') {
      for (var i = 1; i < 9; ++i) {
        arr.push(Math.floor(hourInfor.list[i].main.temp - 272.15));
      }
    } else {
      for (var i = 1; i < 9; ++i) {
        arr.push(Math.floor((hourInfor.list[i].main.temp * 9) / 5 - 459.67));
      }
    }

    return arr;
  });

  const [dataTime, setDataTime] = useState(() => {
    let arr = [];
    for (var i = 1; i < 9; ++i) {
      arr.push({
        icon: hourInfor.list[i].weather[0].icon,
        time: hourInfor.list[i].dt_txt.slice(11, 16),
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
  // const [savedCities, setSavedCities] = useState([]);
  const [isSave, setIsSave] = useState(false);
  let widthDrawer = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    getInformaiton();
    // getSaved();
  }, []);

  useEffect(() => {
    let dataChartTemp = calDataChart();
    setDataChart(dataChartTemp);
    let dataTimeTemp = calDataTime();
    setDataTime(dataTimeTemp);
  }, [unit, hourInfor]);

  useEffect(() => {
    let inforTemp = setInforTemp();
    setArrValTemp(inforTemp);
    setArrValWind([
      hourInfor.list[selectedTime + 1].wind.speed + ' m/s',
      hourInfor.list[selectedTime + 1].wind.deg + ' °',
      hourInfor.list[selectedTime + 1].wind.gust + ' m/s',
    ]);
    setArrValClound([hourInfor.list[selectedTime + 1].clouds.all + ' %']);
    setArrValVisibility([
      Number.parseFloat(hourInfor.list[selectedTime + 1].visibility / 1000)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' km',
    ]);
  }, [hourInfor, selectedTime, unit]);

  useEffect(() => {
    setArrValInfor([
      hourInfor.city.name,
      hourInfor.city.country,
      hourInfor.city.coord.lat,
      hourInfor.city.coord.lon,
    ]);
  }, [hourInfor]);

  //lấy thông tin thời tiết
  async function getInformaiton() {
    const result = await getByName(input.current);
    //console.log('infor', result);
    if (result !== undefined) {
      setHourInfor(result.hour);
      setDayInfor(result.day);
    } else showToast();
  }

  //lấy danh sách địa điểm đã lưu
  // const getSaved = async () => {
  //   let savedCitiesTemp = await getSavedCities();
  //   //console.log(`savedCitiesTemp`, savedCitiesTemp)
  //   setSavedCities(savedCitiesTemp);
  //   if (savedCities.find(dayInfor.city_name)) {
  //     setIsSave(true);
  //   } else {
  //     setIsSave(false);
  //   }
  // };

  //tính toán data để truyền cho chart
  const calDataChart = () => {
    let arr = [];
    if (unit === '°C') {
      for (var i = 1; i < 9; ++i) {
        arr.push(Math.floor(hourInfor.list[i].main.temp - 272.15));
      }
    } else {
      for (var i = 1; i < 9; ++i) {
        arr.push(Math.floor((hourInfor.list[i].main.temp * 9) / 5 - 459.67));
      }
    }
    return arr;
  };

  //tính thời gian cho phía dưới chart
  const calDataTime = () => {
    let arr = [];
    for (var i = 1; i < 9; ++i) {
      arr.push({
        icon: hourInfor.list[i].weather[0].icon,
        time: hourInfor.list[i].dt_txt.slice(11, 16),
      });
    }
    return arr;
  };
  const setInforTemp = () => {
    if (unit === '°C') {
      return [
        Number.parseFloat(
          hourInfor.list[selectedTime + 1].main.temp - 272.15,
        ).toFixed(1) + ' °',
        Number.parseFloat(
          hourInfor.list[selectedTime + 1].main.feels_like - 272.15,
        ).toFixed(1) + ' °',
        Number.parseFloat(
          hourInfor.list[selectedTime + 1].main.temp_min - 272.15,
        ).toFixed(1) + ' °',
        Number.parseFloat(
          hourInfor.list[selectedTime + 1].main.temp_max - 272.15,
        ).toFixed(1) + ' °',
        hourInfor.list[selectedTime + 1].main.pressure
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' hPa',
        hourInfor.list[selectedTime + 1].main.sea_level
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' hPa',
        hourInfor.list[selectedTime + 1].main.humidity + ' %',
      ];
    } else {
      return [
        Number.parseFloat(
          (hourInfor.list[selectedTime + 1].main.temp * 9) / 5 - 459.67,
        ).toFixed(1) + ' °',
        Number.parseFloat(
          (hourInfor.list[selectedTime + 1].main.feels_like * 9) / 5 - 459.67,
        ).toFixed(1) + ' °',
        Number.parseFloat(
          (hourInfor.list[selectedTime + 1].main.temp_min * 9) / 5 - 459.67,
        ).toFixed(1) + ' °',
        Number.parseFloat(
          (hourInfor.list[selectedTime + 1].main.temp_max * 9) / 5 - 459.67,
        ).toFixed(1) + ' °',
        hourInfor.list[selectedTime + 1].main.pressure
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' hPa',
        hourInfor.list[selectedTime + 1].main.sea_level
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' hPa',
        hourInfor.list[selectedTime + 1].main.humidity + ' %',
      ];
    }
  };
  //đổi thành phố
  const changeCity = async () => {
    Keyboard.dismiss();
    await getInformaiton();
    // await getSaved();
  };
  //refresh
  const onRefresh = () => {
    setLoading(true);
    getInformaiton();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  //liên quan đến Tab
  const handleIndexChange = index => {
    navigationState.index = index;
  };
  //toast khi tìm kiếm hỏng
  const showToast = () => {
    ToastAndroid.show('Khong co thanh pho trong he thong!', ToastAndroid.SHORT);
  };
  //chạy animation hiện drawer
  const showDrawer = () => {
    Animated.timing(widthDrawer, {
      toValue: ScreenWidth,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  //chạy animation hideDrawer
  const hideDrawer = () => {
    Animated.timing(widthDrawer, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  //lưu địa điểm
  // const save = async () => {
  //   if (!isSave) {
  //     await saveCity(dayInfor.city_name);
  //     savedCities.push(dayInfor.city_name);
  //     console.log(`savedCities`, savedCities);
  //   } else {
  //     await deleteCity(dayInfor.city_name);
  //     let newArr = [...savedCities];
  //     let order = newArr.indexOf(dayInfor.city_name);
  //     newArr.splice(order, 1);
  //     setSavedCities(newArr);
  //     console.log(`savedCities`, savedCities);
  //   }
  //   setIsSave(!isSave);
  // };
  //chọn thành phố trong danh sách đã lưu
  // const choosedCity = city => {
  //   input.current = city;
  //   changeCity();
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{backgroundColor: '#3399ff'}}>
        <View style={styles.header}>
          <TouchableOpacity style={{marginLeft: 10}} onPress={showDrawer}>
            <Octicons name="three-bars" size={26} color="#a6a6a6" />
          </TouchableOpacity>
          <View style={{marginHorizontal: 20, flex: 1}}>
            <TextInput
              style={{
                backgroundColor: '#f2f2f2',
                height: 40,
                borderRadius: 5,
              }}
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
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={{}}>
        <TabView
          navigationState={navigationState}
          onIndexChange={handleIndexChange}
          renderScene={SceneMap({
            today: () => (
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
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                      }}>
                      <Text
                        style={[
                          styles.text,
                          {
                            fontSize: 26,
                            fontWeight: '700',
                            color: '#fff',
                            marginLeft: 20,
                          },
                        ]}>
                        {dayInfor.city_name}, {dayInfor.country_code}
                      </Text>
                      {/* <TouchableOpacity onPress={save}>
                        <FontAwesome
                          name={isSave ? 'star' : 'star-o'}
                          color="#fff"
                          size={20}
                          style={{marginLeft: 15}}
                        />
                      </TouchableOpacity> */}
                    </View>

                    <View style={styles.mainWeather}>
                      <View
                        style={{
                          flexDirection: 'column',
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={[
                              {color: '#fff', fontSize: 20, fontWeight: '700'},
                              styles.text,
                            ]}>
                            Max{' '}
                            {unit === '°C'
                              ? Math.floor(
                                  hourInfor.list[1].main.temp_max - 272.15,
                                )
                              : Math.floor(
                                  (hourInfor.list[1].main.temp_max * 9) / 5 -
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
                              ? Math.floor(
                                  hourInfor.list[1].main.temp_min - 272.15,
                                )
                              : Math.floor(
                                  (hourInfor.list[1].main.temp_min * 9) / 5 -
                                    459.67,
                                )}
                            °
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', marginVertical: 16}}>
                          <Text
                            style={[
                              {
                                color: '#fff',
                                fontSize: 100,
                                fontWeight: 'bold',
                              },
                              styles.text,
                            ]}>
                            {unit === '°C'
                              ? Math.floor(hourInfor.list[1].main.temp - 272.15)
                              : Math.floor(
                                  (hourInfor.list[1].main.temp * 9) / 5 -
                                    459.67,
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
                            ? Math.floor(
                                hourInfor.list[1].main.feels_like - 272.15,
                              )
                            : Math.floor(
                                (hourInfor.list[1].main.feels_like * 9) / 5 -
                                  459.67,
                              )}
                          °
                        </Text>
                      </View>
                      <View
                        style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Image
                          style={{width: 150, height: 150}}
                          source={{
                            uri: `http://openweathermap.org/img/wn/${hourInfor.list[1].weather[0].icon}@2x.png`,
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
                          {hourInfor.list[1].weather[0].main}
                        </Text>
                        <Text
                          style={[
                            {color: '#fff', fontSize: 20, fontWeight: '700'},
                            styles.text,
                          ]}>
                          {hourInfor.list[1].weather[0].description}
                        </Text>
                      </View>
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
                    <View style={{marginVertical: 5}}>
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
                  </View>
                  <View style={styles.sectionView}>
                    <View style={{marginVertical: 5}}>
                      <Table
                        title="Wind"
                        arrKey={['Speed', 'Direction', 'Gust']}
                        arrValue={arrValWind}
                      />
                    </View>
                  </View>
                  <View style={styles.sectionView}>
                    <View style={{marginVertical: 5}}>
                      <Table
                        title="Clouds"
                        arrKey={['Cloudiness']}
                        arrValue={arrValClound}
                      />
                    </View>
                  </View>
                  <View style={styles.sectionView}>
                    <View style={{marginVertical: 5}}>
                      <Table
                        title="Visibility"
                        arrKey={['Visibility']}
                        arrValue={arrValVisibility}
                      />
                    </View>
                  </View>
                  <View style={styles.sectionView}>
                    <View style={{marginVertical: 5}}>
                      <Table
                        title="More hourInfors"
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
                </View>
              </ScrollView>
            ),
            future: () => (
              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }>
                {dayInfor.data.map((value, index) => {
                  return <TagDay data={value} unit={unit} key={index} />;
                })}
              </ScrollView>
            ),
          })}
        />
      </TouchableWithoutFeedback>
      <Drawer
        width={widthDrawer}
        unit={unit}
        hideDrawer={hideDrawer}
        setUnit={setUnit}
        //savedCities={savedCities}
        //choosedCity={choosedCity}
      />
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
    marginTop: 10,
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
