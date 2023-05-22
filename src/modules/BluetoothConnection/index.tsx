import { Button } from "@components/Button";
import React, { useCallback, useState } from "react";
import { Container } from "./styles";
import { StackParamList } from "@routes/routesPath";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import BleManager from "react-native-ble-manager";
import { Platform, PermissionsAndroid } from "react-native";

export function BluetoothConnection() {
  const { navigate, goBack } =
    useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <Container>
      <Button label="Scan here" onPress={() => {}} />
      <Button
        label="Go back"
        onPress={() => {
          goBack();
        }}
      />
    </Container>
  );
}
