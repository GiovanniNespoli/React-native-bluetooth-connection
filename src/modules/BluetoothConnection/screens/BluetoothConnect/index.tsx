import React, { useCallback, useEffect, useState } from "react";
import { Container } from "./styles";
import { useBluetooth } from "../../hooks/BluetoothPermissions";
import { FlatList } from "react-native";
import { ConnectButton } from "../../components/ConnectButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "@src/routes/routesPath";

export function BluetoothConnection() {
  const { navigate } = useNavigation<StackNavigationProp<StackParamList>>();

  const { scanForDevices, deviceList, connectToDevice, loading } =
    useBluetooth();

  useEffect(() => {
    scanForDevices();
  }, [deviceList]);

  const sendIdToConnection = useCallback(
    async (value: string) => {
      connectToDevice(value);
      navigate("BluetoothConnected");
    },
    [connectToDevice]
  );

  return (
    <Container>
      <FlatList
        style={{ flex: 1, width: 200 }}
        data={deviceList}
        renderItem={({ item }) => (
          <ConnectButton
            device={item}
            onPress={() => sendIdToConnection(item.id)}
            style={{ width: 200 }}
            label={item.name}
          />
        )}
      />
    </Container>
  );
}
