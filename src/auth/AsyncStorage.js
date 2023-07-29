import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (key, value) =>{
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Error saving data: ', error);
  }
}

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log('Error retrieving data: ', error);
  }
};
