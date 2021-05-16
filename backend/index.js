import axios from 'axios';
import AsynStorage from '@react-native-async-storage/async-storage';

export const getByName = async city => {
  const hourURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=10&appid=f99f40229184ecd65710b000570f9efc`;
  const dayURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=c28512189a3142c1adc0c995e4335187`;
  //console.log(URL)
  try {
    const hourResult = await axios.get(hourURL);
    const dayResult = await axios.get(dayURL);
    // console.log(`hourResult`, hourResult.data)
    // console.log(`dayResult`, dayResult.data)
    return {hour: hourResult.data, day: dayResult.data};
  } catch (error) {
    console.log(error);
  }
};

//lưu 1 thành phố mới
export const saveCity = async city => {
  let newcity = [city];
  try {
    let arrCity = await AsynStorage.getItem('savedCities');
    // console.log('saveCity');
    // console.log(`arrCity`, arrCity)
    if (arrCity.length === 0) {
      await AsynStorage.setItem('savedCities', JSON.stringify(newcity));
    } else {
      let newArr = JSON.parse(arrCity);
      newArr = newArr.concat(newcity);
      await AsynStorage.setItem('savedCities', JSON.stringify(newArr));
    }
  } catch (error) {
    console.log(error);
  }
};

//xóa 1 thành phố
export const deleteCity = async city => {
  try {
    let arrCity = await AsynStorage.getItem('savedCities');
    // console.log('delCity');
    // console.log(`arrCity`, arrCity)
    if ( arrCity.length === 0) {
      throw new Error('chua co danh sach luu ma da xoa');
    } else {
      let newArr = JSON.parse(arrCity);
      let order = newArr.indexOf(city);
      newArr.splice(order, 1);
      await AsynStorage.setItem('savedCities', JSON.stringify(newArr));
    }
  } catch (error) {
    console.log(error);
  }
};

//lấy danh sách các thành phố đã lưu

export const getSavedCities = async () => {
  try {
    let arrCity = await AsynStorage.getItem('savedCities');
    //console.log(`arrCity`, arrCity);
    if (arrCity === null) {
      arrCity = '[]';
      await AsynStorage.setItem('savedCities', arrCity);
    }
    return JSON.parse(arrCity);
  } catch (error) {
    console.log(error);
  }
};
