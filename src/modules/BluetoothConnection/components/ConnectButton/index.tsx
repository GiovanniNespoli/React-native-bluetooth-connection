import React, { useCallback } from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, ButtonLabel } from "./styles";
import { Device } from "react-native-ble-plx";

interface IButtonProps extends TouchableOpacityProps {
  label: string | null;
  device: Device;
}

export const ConnectButton: React.FC<IButtonProps> = ({
  label,
  device,
  ...rest
}) => {
  const handleDeviceId = useCallback(async () => {}, []);
  return (
    <Container onPress={handleDeviceId} {...rest}>
      <ButtonLabel>{label}</ButtonLabel>
    </Container>
  );
};
