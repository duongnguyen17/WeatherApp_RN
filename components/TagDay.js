import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Table from './Table';
const TagDay = props => {
  const [unit, setUnit] = useState(props.unit);
  const [data, setData] = useState(props.data);
  const [arrValue, setArrValue] = useState([]);
  const [isShow, setIsShow] = useState(false);
  let height = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let arr = setValue();
    setArrValue(arr);
  }, []);
  const setValue = () => {
    return [
      Number.parseFloat(data.wind_spd).toFixed(2) + 'm/s',
      data.wind_dir + '°',
      Number.parseFloat(data.wind_gust_spd).toFixed(2) + 'm/s',
      data.rh + '%',
      Number.parseFloat(data.uv).toFixed(2),
      data.clouds_hi + '%',
      Number.parseFloat(data.vis * 1000).toFixed(1) + 'm',
    ];
  };
  const show = () => {
    Animated.timing(height, {
      toValue: 230,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setIsShow(true);
      // console.log(`height`, height);
    });
  };
  const hide = () => {
    Animated.timing(height, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setIsShow(false);
      // console.log(`height`, height);
    });
  };
  return (
    <View style={styles.container}>
      <View style={{marginHorizontal: 20, marginVertical: 7}}>
        <TouchableOpacity
          onPress={() => {
            if (!isShow) {
              show();
            } else {
              hide();
            }
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontWeight: '600', fontSize: 16}}>
              {data.datetime}
            </Text>
            <Text style={{color: 'gray', fontSize: 15}}>
              {data.weather.description}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 60, height: 60, marginRight: 20}}
              source={{
                uri: `https://www.weatherbit.io//static/img/icons/${data.weather.icon}.png`,
              }}
            />
            <View
              style={{flexDirection: 'column', justifyContent: 'space-around'}}>
              <Text style={{fontSize: 16}}>
                {unit === '°C'
                  ? data.max_temp + ' °'
                  : Number.parseFloat(data.max_temp * 1.8 + 32).toFixed(1) +
                    ' °'}
              </Text>
              <Text style={{fontSize: 16}}>
                {unit === '°C'
                  ? data.min_temp + ' °'
                  : Number.parseFloat(data.low_temp * 1.8 + 32).toFixed(1) +
                    ' °'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Animated.View style={{height: height, backgroundColor: '#fff'}}>
          <Table
            title=""
            arrKey={[
              'Wind Speed',
              'Wind Direction',
              'Wind Gust',
              'Humidity',
              'UV index',
              'Cloudiness',
              'Visibility',
            ]}
            arrValue={arrValue}
          />
        </Animated.View>
      </View>
    </View>
  );
};

export default TagDay;

const styles = StyleSheet.create({
  container: {
    borderColor: '#d9d9d9',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
});
