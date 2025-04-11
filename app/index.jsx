import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router, Link, Redirect } from "expo-router"
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images, icons } from "../constants"
import { useGlobalContext } from '../context/GlobalProvider'

const index = () => {
  const { isLoggedIn, isLoading } = useGlobalContext()
 
  setTimeout(() => {
    if(isLoggedIn)  router.replace("/calllog") 
      else
    //  router.replace('/onboarding')
    router.replace('/sign')
  }, 1000);

  return (
    <View className="w-full h-full justify-center items-center relative bg-white">
        <Text className="font-wsemibold color-blue-600" style={{fontSize: 60}}>Nexa</Text>
      <Text className="text-gray-400" style={{position: "absolute", bottom: 5}}>an NA product</Text>
    </View>
  )
}

export default index