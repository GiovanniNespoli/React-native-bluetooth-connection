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

export function BluetoothConnected({
  route,
}: BluetoothScreenProps<"BluetoothConnected">) {
  const { goBack } = useNavigation<StackNavigationProp<StackParamList>>();
  const {
    params: {
      characteristicId,
      serviceId,
      deviceId,
      value: { nome, sentido, voltas },
    },
  } = route;

  return (
    <Container>
      <DeviceTitle>Device: {deviceId}</DeviceTitle>
      <BluetoothInformationsContainer>
        <BluetoothInformations size={13}>
          Serviço: {serviceId}
        </BluetoothInformations>
        <BluetoothInformations size={11}>
          Característica: {characteristicId}
        </BluetoothInformations>
      </BluetoothInformationsContainer>
      <BluetoothContainer>
        <BluetoothInformations>Nome: {nome}</BluetoothInformations>
        <BluetoothInformations>Sentido: {sentido}</BluetoothInformations>
        <BluetoothInformations>Voltas: {voltas}</BluetoothInformations>
      </BluetoothContainer>
      <Button
        label="Go Back"
        onPress={() => {
          goBack();
        }}
      />
    </Container>
  );
}
