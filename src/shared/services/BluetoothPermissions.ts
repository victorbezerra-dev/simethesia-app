import { PermissionsAndroid, Platform } from 'react-native';

export async function requestBlePermissions() {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 31) {
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      const allGranted = Object.values(result).every(
        status => status === PermissionsAndroid.RESULTS.GRANTED
      );

      if (!allGranted) {
        throw new Error('Bluetooth or Location permissions not granted.');
      }

    } else {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (result !== PermissionsAndroid.RESULTS.GRANTED) {
        throw new Error('Location permission not granted.');
      }
    }
  }
}

