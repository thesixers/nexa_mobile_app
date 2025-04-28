import "../_polyfill"
import "./global.css"

// import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from "expo-font"
import { GlobalProvider } from '../context/GlobalProvider'
import { StatusBar } from 'expo-status-bar'


SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "WinkySans-Light": require("../assets/fonts/WinkySans-Light.ttf"),
    "WinkySans-Regular": require("../assets/fonts/WinkySans-Regular.ttf"),
    "WinkySans-Medium": require("../assets/fonts/WinkySans-Medium.ttf"),
    "WinkySans-SemiBold": require("../assets/fonts/WinkySans-SemiBold.ttf"),
    "WinkySans-Bold": require("../assets/fonts/WinkySans-Bold.ttf"),
    "WinkySans-ExtraBold": require("../assets/fonts/WinkySans-ExtraBold.ttf"),
    "WinkySans-Black": require("../assets/fonts/WinkySans-Black.ttf"),
  })

  useEffect(() => {
    if(error) throw error;

    if(fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  return (
    <>
    <GlobalProvider>
      <Stack>
        <Stack.Screen name='index' options={{headerShown: false}}  />
        <Stack.Screen name='(main)' options={{headerShown: false}}  />
        <Stack.Screen name='display/[user]' options={{headerShown: false}}  />
        <Stack.Screen name='display/countrycodes' options={{headerShown: false}}  />
        <Stack.Screen name='display/callui' options={{headerShown: false}}  />
        <Stack.Screen name='(auth)' options={{headerShown: false}}  />
    </Stack>
    </GlobalProvider>
    <StatusBar backgroundColor='white' style='dark' />
    </>
  )
}

export default RootLayout