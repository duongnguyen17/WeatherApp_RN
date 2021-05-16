import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

const ScreenWidth = Math.floor(Dimensions.get('screen').width);
const ScreenHeight = Math.floor(Dimensions.get('screen').height);
const Drawer = props => {
  const {width, unit, hideDrawer, setUnit} = props;
  return (
    <View style={[styles.container, {width: width, flexDirection: 'row'}]}>
      <View style={{width: ScreenWidth * 0.8, backgroundColor: '#fff'}}>
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
                hideDrawer();
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
                hideDrawer();
                setUnit('°F');
              }}>
              <Text style={{fontSize: 20}}>°F</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={hideDrawer}
        style={{opacity: 0.4, width: ScreenWidth * 0.2}}
      />
    </View>
  );
};

export default Drawer;
const styles = StyleSheet.create({
  container: {
    height: ScreenHeight,
  },
});
