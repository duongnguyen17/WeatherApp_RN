import React from 'react';
import {View, StyleSheet, Text, ScrollView, Image, Text} from 'react-native';
import {ScreenHeight} from './MainView';
import {styles} from './styles';
export default function Today() {
  const [information, setInformation] = useState(props.information);
  return (
    <View style={{flex: 1}}>
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
                    : Math.floor((information.main.temp_max * 9) / 5 - 459.67)}
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
                    : Math.floor((information.main.temp_min * 9) / 5 - 459.67)}
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
                  : Math.floor((information.main.feels_like * 9) / 5 - 459.67)}
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
    </View>
  );
}
