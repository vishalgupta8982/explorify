import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAsyncStorageData = async (item )=> {
  try {
      const value = await AsyncStorage.getItem(item);
     return value
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;  
  }
};
