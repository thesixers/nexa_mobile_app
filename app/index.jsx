import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, router } from "expo-router"
import { useGlobalContext } from '../context/GlobalProvider'

const index = () => {
  const { isLoggedIn, isLoading } = useGlobalContext()

      if(isLoggedIn && !isLoading) {
        return <Redirect href="/calllog" />
      }
      else{
        return <Redirect href="/onboarding" />
      }
    


  return (
    <View className="w-full h-full justify-center items-center relative bg-white">
        <Text className="font-wsemibold color-blue-600" style={{fontSize: 60}}>Nexa</Text>
      <Text className="text-gray-400" style={{position: "absolute", bottom: 5}}>an NA product</Text>
    </View>
  )
}

export default index