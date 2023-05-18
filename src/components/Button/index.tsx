import React from "react";
import { TouchableOpacityProps } from "react-native";
import { Container, ButtonLabel } from "./styles";

interface IButtonProps extends TouchableOpacityProps {
    label: string;
}

export const Button: React.FC<IButtonProps> = ({ label, ...rest }) => {
    return (
        <Container {...rest}>
            <ButtonLabel>{label}</ButtonLabel>
        </Container>
    )
}