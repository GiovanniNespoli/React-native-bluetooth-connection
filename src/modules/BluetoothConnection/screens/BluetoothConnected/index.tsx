import { Button } from "@components/Button";
import React, { useCallback, useEffect, useState } from "react";
import {
  BluetoothContainer,
  BluetoothInformations,
  BluetoothInformationsContainer,
  Container,
  DeviceTitle,
} from "./styles";
import { BluetoothScreenProps, StackParamList } from "@routes/routesPath";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useBluetooth } from "../../hooks/BluetoothPermissions";

export function BluetoothConnected({
  route,
}: BluetoothScreenProps<"BluetoothConnected">) {
  const { goBack } = useNavigation<StackNavigationProp<StackParamList>>();
  const { deviceInformations, disconnectDevice, sendData } = useBluetooth();

  return (
    <Container>
      <DeviceTitle>Device: {deviceInformations.deviceUUID}</DeviceTitle>
      <BluetoothInformationsContainer>
        <BluetoothInformations size={13}>
          Serviço: {deviceInformations.serviceUUID}
        </BluetoothInformations>
        <BluetoothInformations size={11}>
          Característica: {deviceInformations.characteristicUUID}
        </BluetoothInformations>
      </BluetoothInformationsContainer>
      <BluetoothContainer>
        <BluetoothInformations>
          Voltas: {deviceInformations.value.voltas}
        </BluetoothInformations>
      </BluetoothContainer>
      <Button
        label="Disconnect"
        onPress={() => {
          disconnectDevice(deviceInformations.deviceUUID);
          goBack();
        }}
      />
      <Button
        label="Send data"
        onPress={() => {
          sendData("Teste");
        }}
      />
    </Container>
  );
}
