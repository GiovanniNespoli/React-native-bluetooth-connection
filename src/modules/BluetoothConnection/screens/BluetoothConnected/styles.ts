import theme from "@styles/theme";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #292b2e;
  align-items: center;
  justify-content: center;
`;

interface ITextProps {
  size?: number;
}

export const BluetoothInformations = styled.Text<ITextProps>`
  font-size: ${({ size }) => (size ? size : 20)}px;
  color: #000;
  font-family: ${theme.text.outfit.medium};
`;
export const DeviceTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  color: #fff;
  font-family: ${theme.text.outfit.medium};
`;

export const BluetoothContainer = styled.View`
  width: 85%;
  height: ${RFValue(100)}px;
  background-color: #fff;
  border-radius: 10px;
  padding-left: 10px;
  justify-content: space-evenly;
`;

export const BluetoothInformationsContainer = styled.View`
  width: 85%;
  height: ${RFValue(50)}px;
  background-color: #daa296;
  border-radius: 10px;
  padding-left: 10px;
  justify-content: space-evenly;
  margin: 10px 0px;
`;
