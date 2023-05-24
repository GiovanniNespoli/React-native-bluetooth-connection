import theme from "@styles/theme";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native"

export const Container = styled.View`
    flex: 1;
    background-color: #292B2E;
    align-items: center;
    justify-content: center;
`;

export const BluetoothInformations = styled.Text`
    font-size: ${RFValue(20)}PX;
    color: #fff;
    font-family: ${theme.text.outfit.medium}
`;