import React from 'react';
import { Image } from 'react-native';
import Routes from '@routes/index.routes';
import { useFonts, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { Outfit_500Medium, Outfit_700Bold } from '@expo-google-fonts/outfit';

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Outfit_500Medium,
    Outfit_700Bold,
  })

  if (!fontsLoaded) {
    return <Image source={require("@assets/icon.png")} />
  } else {
    return (
      <Routes />
    );
  }
}