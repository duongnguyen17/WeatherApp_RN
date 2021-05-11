import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScreenWidth} from '../screens/MainView';

export default function Table(props) {
  const [title, setTitle] = useState('');
  const [arrKey, setArrKey] = useState([]);
  const [arrValue, setArrValue] = useState([]);
  useEffect(() => {
    setArrKey(props.arrKey);
    setArrValue(props.arrValue);
    setTitle(props.title);
  }, []);
  return (
    <View style={styles.insectionView}>
      <Text style={{fontSize: 17, fontWeight: '700'}}>{title}</Text>
      <View style={{marginTop: 20, flexDirection: 'row'}}>
        <View style={styles.column}>
          {arrKey.map((value, index) => (
            <View key={index} style={styles.row}>
              <Text>{value}</Text>
            </View>
          ))}
        </View>
        <View style={styles.column}>
          {arrValue.map((value, index) => (
            <View key={index} style={styles.row}>
              <Text>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  insectionView: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  column: {
    width: 200,
    flexDirection: 'column',
  },
  row: {marginVertical: 5},
});
