import { Button } from "@components/Button";
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "./styles";
import { StackParamList } from "@routes/routesPath";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import useBluetoothPermissions from "../../hooks/BluetoothPermissions";
import DeviceModal from "../../components/DeviceConnectionModal";

export function BluetoothConnection() {
  const { navigate, goBack } =
    useNavigation<StackNavigationProp<StackParamList>>();
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    deviceInformations: {
      deviceId,
      characteristicId,
      serviceId,
      value: { nome, sentido, voltas },
    },
  } = useBluetoothPermissions();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();

    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  useEffect(() => {
    if (connectedDevice) {
      navigate("BluetoothConnected", {
        serviceId,
        characteristicId,
        value: { nome, sentido, voltas, deviceId },
      });
    } else {
      console.log("Erro ao conectar");
    }
  }, [connectedDevice, characteristicId, serviceId, nome, sentido, voltas]);

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  return (
    <Container>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        onPressConnectToPeripheral={(value) => {
          connectToDevice(value);
        }}
        devices={allDevices}
      />
      <Button label="Scan here" onPress={openModal} />
      <Button
        label="Go back"
        onPress={() => {
          goBack();
        }}
      />
    </Container>
  );
}
