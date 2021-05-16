import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const ScreenWidth = Math.floor(Dimensions.get('screen').width);
const ScreenHeight = Math.floor(Dimensions.get('screen').height);
const Drawer = props => {
  const [width, setWidth] = useState(props.width);
  const unit = props.unit;
  const hideDrawer = props.hideDrawer;
  const setUnit = props.setUnit;
  // const choosedCity = props.choosedCity;
  // const [savedCities, setSavedCities] = useState(props.savedCities);
  // useEffect(() => {
  //   console.log(`savedCities`, savedCities);
  // }, []);
  return (
    <Animated.View
      style={[styles.container, {width: width, flexDirection: 'row'}]}>
      <View style={{flex: 3, backgroundColor: '#fff'}}>
        <View style={{height: 113, backgroundColor: '#99ccff'}}></View>
        <View style={{marginTop: 30, marginHorizontal: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Unit</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              marginRight: 100,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                flex: 1,
                borderRadius: 3,
                backgroundColor: unit === '°C' ? '#d9d9d9' : '#fff',
              }}
              onPress={() => {
                setUnit('°C');
                hideDrawer();
              }}>
              <Text style={{fontSize: 20}}>°C</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 20,
                height: 30,
                flex: 1,
                borderRadius: 3,
                backgroundColor: unit === '°F' ? '#d9d9d9' : '#fff',
              }}
              onPress={() => {
                setUnit('°F');
                hideDrawer();
              }}>
              <Text style={{fontSize: 20}}>°F</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{marginTop: 30, marginHorizontal: 20}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>Saved</Text>
          <ScrollView style={{height: 90}}>
            {savedCities.map((value, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  choosedCity(value);
                }}
                style={{
                  marginBottom: 10,
                  borderRadius: 5,
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderColor: 'gray',
                }}>
                <Text>{value}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View> */}
      </View>
      <TouchableWithoutFeedback onPress={hideDrawer}>
        <View
          style={{
            opacity: 0.4,
            backgroundColor: '#fff',
            flex: 1,
          }}
        />
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default Drawer;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: ScreenHeight,
    left: 0,
  },
});
