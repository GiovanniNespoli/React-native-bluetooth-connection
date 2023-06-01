import { Button } from "@components/Button";
import React, { useCallback, useEffect } from "react";
import { Container, NavigateText } from "./styles";
import { StackParamList } from "@routes/routesPath";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useBluetooth } from "../BluetoothConnection/hooks/BluetoothPermissions";

export function Welcome() {
  const { navigate } = useNavigation<StackNavigationProp<StackParamList>>();

  const { requestPermissions } = useBluetooth();

  const getPermissions = useCallback(async () => {
    const permissions = await requestPermissions();

    if (permissions) {
      navigate("BluetoothConnection")
    } else {
      console.log("Erro nas permissões");
    }
  }, []);

  return (
    <Container>
      <NavigateText>Want to scan bluetooth devices ?</NavigateText>
      <Button
        label="Click here!!"
        onPress={() => {
          getPermissions();
        }}
      />
    </Container>
  );
}
