import axios from 'axios';

export const getByName = async city => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f99f40229184ecd65710b000570f9efc`;
  //console.log(URL)
  try {
    const result = await axios.get(URL);
    //console.log('result', result.data);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
