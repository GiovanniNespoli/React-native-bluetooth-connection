import { Button } from "@components/Button";
import React from "react";
import { Container, NavigateText } from "./styles";
import { StackParamList } from "@routes/routesPath";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export function Welcome() {
  const { navigate } = useNavigation<StackNavigationProp<StackParamList>>();

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
