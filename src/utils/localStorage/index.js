import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // saving error
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    // error reading value
  }
};


export const urlAPI = 'https://moroom.zavalabs.com/api';
export const urlAvatar = urlAPI.replace("api", "avatar/");
export const urlJadwal = urlAPI.replace("api", "jadwal/");
export const urlLaporan = urlAPI.replace("api", "fotolaporan/");