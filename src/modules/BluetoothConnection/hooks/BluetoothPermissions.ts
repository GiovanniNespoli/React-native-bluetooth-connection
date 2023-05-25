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
  scanForPeripherals(): void;
  allDevices: Device[];
  connectToDevice: (deviceId: Device) => Promise<void>;
  connectedDevice: Device | null;
  deviceInformations: {
    deviceId: string;
    serviceId: string;
    characteristicId: string;
    value: { nome: string; voltas: string; sentido: string };
  };
}

function useBluetoothPermissions(): IBluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);

  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [deviceInformations, setDeviceInformations] = useState({
    deviceId: "",
    serviceId: "",
    characteristicId: "",
    value: { nome: "string", voltas: "string", sentido: "string" },
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

  //verifcar se há perifericos iguais
  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  //verificar perifericos para conectar
  const scanForPeripherals = () => {
    // 1º parm -> array de UUID que são registradas em um periferico escaneado, se for null mostrará todos os perifericos
    //2º parm -> opções para escanear
    //3º parm -> função de error e e do periferico escaneado
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      }

      //verifica os device e o nome dele para listar
      if (device && device.name?.includes("")) {
        setAllDevices((prevState: Device[]) => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });
  };

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection
        .discoverAllServicesAndCharacteristics()
        .then((allservices) => {
          let servicesArray = allservices.services();

          servicesArray.then((services) => {
            const customService = services.find(
              (service) =>
                service.uuid === "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
            );

            if (!customService?.uuid) {
              return console.log("Erro ao achar custom service");
            }
            startStreamingData(device, customService.uuid);
          }).catch((error) => {
            console.log(error);
          });
        }).catch((error) => {
          console.log(error);
        });
      bleManager.stopDeviceScan();
    } catch (error) {
      console.log(error);
    }
  };

  // const onInformationsUpdate = (
  //   error: BleError | null,
  //   characteristic: Characteristic | null
  // ) => {
  //   if (error) {
  //     console.log(error);
  //   } else if (!characteristic?.value) {
  //     console.log("No data Recieved");
  //     return;
  //   }
  //   const rawData = base64.decode(characteristic?.value);
  //   // console.log("CARACTERISTICA", characteristic);

  //   setDeviceInformations(rawData);
  // };

  const startStreamingData = async (device: Device, service: string) => {
    // lê todas as caracteristicas da service
    const characteristicList = await bleManager.characteristicsForDevice(
      device.id,
      service
    );

    let customCharacteristic = characteristicList.find(
      (characteristict) =>
        characteristict.uuid === "beb5483e-36e1-4688-b7f5-ea07361b26a8"
    );

    if (!customCharacteristic?.uuid) {
      return console.log("Erro ao achar custom characteristic");
    }

    if (device) {
      // lê a caracteristica específica da service
      bleManager
        .readCharacteristicForDevice(
          device.id,
          service,
          customCharacteristic.uuid
        )
        .then((characteristic) => {
          const rawData = base64.decode(characteristic?.value);
          const rawDataToJSON = JSON.parse(rawData);

          setDeviceInformations({
            deviceId: device.id,
            serviceId: service,
            characteristicId: characteristic.uuid,
            value: {
              nome: rawDataToJSON.nome,
              sentido: rawDataToJSON.sentido,
              voltas: rawDataToJSON.voltas,
            },
          });
        });
    } else {
      return "Erro ao buscar o serviço";
    }
  };

  return {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    deviceInformations: {
      deviceId: deviceInformations.deviceId,
      characteristicId: deviceInformations.characteristicId,
      serviceId: deviceInformations.serviceId,
      value: {
        nome: deviceInformations.value.nome,
        voltas: deviceInformations.value.voltas,
        sentido: deviceInformations.value.sentido,
      },
    },
  };
}

export default useBluetoothPermissions;
