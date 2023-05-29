import { useMemo, useState } from "react";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";
import { PermissionsAndroid, Platform } from "react-native";
import * as ExpoDevice from "expo-device";
import base64 from "react-native-base64";

interface IBluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForDevices(): void;
  handleSetDeviceId(deviceId: string): void;
  deviceList: Device[];
  deviceId: string;
  // scanForPeripherals(): void;
  // allDevices: Device[];
  // connectToDevice: (deviceId: Device) => Promise<void>;
  // connectedDevice: Device | null;
  // deviceInformations: {
  //   deviceId: string;
  //   serviceId: string;
  //   characteristicId: string;
  //   value: { nome: string; voltas: string; sentido: string };
  // };
  // sendDataTobluetooth: (device: string) => Promise<void>;
}
function useBluetoothPermissions(): IBluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);

  const [deviceId, setDeviceId] = useState("");
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [deviceInformations, setDeviceInformations] = useState({
    // deviceId: "",
    serviceId: "",
    characteristicId: "",
    // value: { nome: "string", voltas: "string", sentido: "string" },
  });
  // const [deviceInformations, setDeviceInformations] = useState("");

  // Pedir permissões do android de level 31
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

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      console.log("é android");

      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        console.log("API < 31");

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "App requires fine location",
            buttonPositive: "ok",
          }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionGranted =
          await requestAndroid31Permissions();
        return isAndroid31PermissionGranted;
      }
    } else {
      return true;
    }
  };

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForDevices = async () => {
    bleManager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        bleManager.stopDeviceScan();
        return console.log("Scan error");
      }
      if (device && device.name?.includes("")) {
        setDeviceList((previousDevice: Device[]) => {
          if (!isDuplicateDevice(previousDevice, device)) {
            return [...previousDevice, device];
          }
          return previousDevice;
        });
      }
    });
  };

  const handleSetDeviceId = async (deviceId: string) => {
    if (deviceId) {
      return setDeviceId(deviceId);
    }
  };

  const connectToDevice = () => {
    bleManager.connectToDevice(deviceId).then(async (device) => {
      await device.discoverAllServicesAndCharacteristics();
      device
        .services()
        .then(async (services) => {
          const findService = services.find(
            (serviceId) =>
              serviceId.uuid === "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
          );

          if (!findService) {
            throw "error";
          }


          const findCharac
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return {
    requestPermissions,
    scanForDevices,
    deviceList,
    handleSetDeviceId,
    deviceId,
  };
}

export default useBluetoothPermissions;
