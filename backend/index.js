import axios from 'axios';

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
