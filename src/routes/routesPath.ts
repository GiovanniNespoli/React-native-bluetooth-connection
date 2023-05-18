import { StackScreenProps } from "@react-navigation/stack";

export type StackParamList = {
    Welcome: undefined,
    BluetoothConnection: undefined
};

export type StackScreen<T extends keyof StackParamList> = StackScreenProps<StackParamList, T>;

