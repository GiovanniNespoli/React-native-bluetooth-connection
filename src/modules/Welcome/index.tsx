import { Button } from "@components/Button";
import React, { useEffect } from "react";
import { Container, NavigateText } from "./styles";
import { StackParamList } from "@routes/routesPath";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import useBluetoothPermissions from "../BluetoothConnection/hooks/BluetoothPermissions";

export function Welcome() {
  const { navigate } = useNavigation<StackNavigationProp<StackParamList>>();

  const {
    connectedDevice,
    deviceInformations: {
      characteristicId,
      deviceId,
      serviceId,
      value: { nome, sentido, voltas },
    },
  } = useBluetoothPermissions();

  useEffect(() => {
    if (connectedDevice) {
      navigate("BluetoothConnected", {
        deviceId,
        characteristicId,
        serviceId,
        value: { nome, sentido, voltas },
      });
    }
  }, []);

  return (
    <Container>
      <NavigateText>Want to scan bluetooth devices ?</NavigateText>
      <Button
        label="Click here!!"
        onPress={() => {
          navigate("BluetoothConnection");
        }}
      />
    </Container>
  );
}
