import { AsyncStorage } from 'react-native';

export const getAccessToken = async () => {
    try {
        const token = await AsyncStorage.getItem('@token09092019:key');
        return (token !== null) ? token : '';
    } catch (error) {
        return '';
    }
};

export const saveAccessToken = async (token = '') => {
    try {
        await AsyncStorage.setItem('@token09092019:key', token);
    } catch (e) {
        console.log(e);
    }
};

export const getRefreshToken = async () => {
    try {
        const token = await AsyncStorage.getItem('@refreshToken09092019:key');
        return (token !== null) ? token : '';
    } catch (error) {
        return '';
    }
};

export const saveRefreshToken = async (token = '') => {
    try {
        await AsyncStorage.setItem('@refreshToken09092019:key', token);
    } catch (e) {
        console.log(e);
    }
};
