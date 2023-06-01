import { Device } from "react-native-ble-plx";
import { PermissionsAndroid } from "react-native";

const requestAndroid31Permissions = async () => {
  //Pedir permissão para o usuário (SCAN)
  const bluetoothScanPermissions = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    {
      title: "Scan Permission",
      message: "App requires Bluetooth Scanning",
      buttonPositive: "ok",
    }
  );
  //Pedir permissão para o usuário (CONNECT)
  const bluetoothConnectPermissions = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    {
      title: "Connect Permission",
      message: "App requires Bluetooth Connecting",
      buttonPositive: "ok",
    }
  );
  //Pedir permissão para o usuário (SCAN)
  const bluetoothFineLocationPermissions = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: "Location Permission",
      message: "App requires fine location",
      buttonPositive: "ok",
    }
  );

  console.log("connect permission", bluetoothConnectPermissions);
  console.log("scan permission", bluetoothScanPermissions);
  console.log("location permission", bluetoothFineLocationPermissions);

  return (
    bluetoothScanPermissions === "granted" &&
    bluetoothConnectPermissions === "granted" &&
    bluetoothFineLocationPermissions === "granted"
  );
};

const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
  devices.findIndex((device) => nextDevice.id === device.id) > -1;

export { requestAndroid31Permissions, isDuplicateDevice };
