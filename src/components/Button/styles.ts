import theme from "@styles/theme";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    width: 70%;
    height: ${RFValue(59)}px;
    background-color: ${theme.colors.secondary};
    border-radius: ${RFValue(15)}px;
    align-items: center;
    justify-content: center;
    margin-top: ${RFValue(25)}px;
`;

interface IButtonLabelProps {
    labelFontSize: number;
}

export const ButtonLabel = styled.Text<IButtonLabelProps>`
    color: ${theme.colors.primary};
    font-family: ${theme.text.outfit.bold};
    font-size: ${RFValue(16)}px;
`;