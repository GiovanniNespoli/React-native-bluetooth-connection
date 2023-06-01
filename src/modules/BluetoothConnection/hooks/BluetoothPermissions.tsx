import {
  requestAndroid31Permissions,
  isDuplicateDevice,
} from "../../../utils/requestBluetoothPermissions";
import React, { useContext } from "react";
import { createContext, useCallback, useMemo, useState } from "react";
import { BleManager, Characteristic, Device } from "react-native-ble-plx";
import { PermissionsAndroid, Platform } from "react-native";
import base64 from "react-native-base64";
import * as ExpoDevice from "expo-device";

interface IDeviceInformations {
  deviceUUID: string;
  serviceUUID: string;
  characteristicUUID: string;
  value: { voltas: string };
}

interface IBluetoothContextState {
  loading: boolean;
  requestPermissions(): Promise<boolean>;
  scanForDevices(): void;
  deviceList: Device[];
  connectToDevice: (deviceId: string) => Promise<void>;
  disconnectDevice: (deviceUUID: string) => Promise<void>;
  deviceInformations: IDeviceInformations;
  sendData: (data: string) => Promise<void>;
}

const BluetoothContext = createContext<IBluetoothContextState>(
  {} as IBluetoothContextState
);

export function BluetoothProvider({ children }: { children: JSX.Element }) {
  const bleManager = useMemo(() => new BleManager(), []);
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [deviceInformations, setDeviceInformations] =
    useState<IDeviceInformations>({} as IDeviceInformations);

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

  const scanForDevices = useCallback(async () => {
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
  }, []);

  const startStreamingData = async (device: string, service: string) => {
    const characteristicList = await bleManager.characteristicsForDevice(
      device,
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
      bleManager
        .readCharacteristicForDevice(device, service, customCharacteristic.uuid)
        .then((characteristic) => {
          const rawData = base64.decode(characteristic?.value);
          const rawDataToJSON = JSON.parse(rawData);

          console.log(rawDataToJSON);

          setDeviceInformations({
            deviceUUID: device,
            serviceUUID: service,
            characteristicUUID: characteristic.uuid,
            value: {
              voltas: rawDataToJSON.voltas,
            },
          });
        });
    }
  };

  const connectToDevice = useCallback(async (deviceId: string) => {
    await bleManager
      .connectToDevice(deviceId)
      .then(async (device) => {
        await device
          .discoverAllServicesAndCharacteristics()
          .then(async (allServices) => {
            let servicesArray = allServices.services();
            await servicesArray
              .then((service) => {
                const customService = service.find(
                  (service) =>
                    service.uuid === "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
                );

                if (!customService?.uuid) {
                  return console.log("Erro ao achar a custom service");
                }

                startStreamingData(deviceId, customService.uuid);
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, []);

  const disconnectDevice = useCallback(async (deviceUUID: string) => {
    await bleManager.cancelDeviceConnection(deviceUUID);
  }, []);

  const sendData = useCallback(async (data: string) => {
    console.log(data);
    console.log(deviceInformations.deviceUUID);

    await bleManager
      .writeCharacteristicWithoutResponseForDevice(
        deviceInformations.deviceUUID,
        deviceInformations.serviceUUID,
        deviceInformations.characteristicUUID,
        window.btoa(data),
      )
      .then(() => {
        console.log("dados enviados");
      })
      .catch((error) => console.log(error));
  }, []);

  const value = useMemo(
    () => ({
      requestPermissions,
      scanForDevices,
      connectToDevice,
      disconnectDevice,
      sendData,
      deviceInformations,
      deviceList,
      loading,
    }),
    [
      requestPermissions,
      scanForDevices,
      connectToDevice,
      disconnectDevice,
      sendData,
      deviceInformations,
      deviceList,
      loading,
    ]
  );

  return (
    <BluetoothContext.Provider value={value}>
      {children}
    </BluetoothContext.Provider>
  );
}

export function useBluetooth(): IBluetoothContextState {
  const context = useContext(BluetoothContext);

  if (!context) {
    throw new Error("useAuth must be within an AuthProvider");
  }
  return context;
}
