import { Button } from "@components/Button";
import React, { useCallback, useEffect, useState } from "react";
import { BluetoothInformations, Container } from "./styles";
import { BluetoothScreenProps, StackParamList } from "@routes/routesPath";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import useBluetoothPermissions from "../../hooks/BluetoothPermissions";
import DeviceModal from "../../components/DeviceConnectionModal";

export function BluetoothConnected({
  route,
}: BluetoothScreenProps<"BluetoothConnected">) {
  const {
    params: { value },
  } = route;

  return (
    <Container>
      <BluetoothInformations>{value}</BluetoothInformations>
    </Container>
  );
}
