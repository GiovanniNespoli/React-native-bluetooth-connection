import React, { useCallback, useEffect, useState } from "react";
import { Container } from "./styles";
import useBluetoothPermissions from "../../hooks/BluetoothPermissions";
import { FlatList } from "react-native";
import { ConnectButton } from "../../components/ConnectButton";

export function BluetoothConnection() {
  const { scanForDevices, deviceList, handleSetDeviceId, deviceId } =
    useBluetoothPermissions();
  const [selectedDeviceId, setSelectedDeviceId] = useState("");

  useEffect(() => {
    scanForDevices();
    console.log("LIST:", deviceList);
  }, [deviceList]);

  useEffect(() => {
    handleSetDeviceId(selectedDeviceId);
    console.log("DEVICE ID:", deviceId);
  }, [selectedDeviceId, deviceId]);
  return (
    <Container>
      <FlatList
        style={{ flex: 1, width: 200 }}
        data={deviceList}
        renderItem={({ item }) => (
          <ConnectButton
            device={item}
            onButtonPress={(value) => setSelectedDeviceId(value)}
            style={{ width: 200 }}
            label={item.name}
          />
        )}
      />
    </Container>
  );
}
