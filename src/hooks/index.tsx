import React from "react";
import { BluetoothProvider } from "@modules/BluetoothConnection/hooks/BluetoothPermissions";

export default function AppProvider({ children }: { children: JSX.Element }) {
  return <BluetoothProvider>{children}</BluetoothProvider>;
}
