import React from 'react';
import {View, Text} from 'react-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
const Gradient = ({index, data}) => {
  return (
    <Defs key={index}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {data.map((value, index) => {
          return (
            <Text
              key={index}
              style={{
                textShadowOffset: {width: 0, height: 1},
                textShadowRadius: 4,
                shadowOpacity: 0.25,
                textShadowColor: '#000',
                fontSize: 16,
                color: '#fff',
              }}>
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
};
export default Gradient;
