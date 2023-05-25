import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

export type StackParamList = {
  Welcome: undefined;
  BluetoothConnection: undefined;
  BluetoothConnected: {
    deviceId: string;
    serviceId: string;
    characteristicId: string;
    value: { nome: string; voltas: string; sentido: string };
  };
};

export type StackProps<T extends keyof StackParamList> = StackScreenProps<
  StackParamList,
  T
>;

export type BluetoothScreenProps<T extends keyof StackParamList> =
  CompositeScreenProps<
    StackScreenProps<StackParamList, T>,
    StackProps<keyof StackParamList>
  >;
