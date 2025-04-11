import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Detail = ({name, icon, title}) => {
  return (
    <TouchableOpacity>
          <View className="flex flex-row gap-2 p-5 h-[80px]">
          <View className="h-full items-center justify-center p-1">
            <Image source={icon} className="w-7 h-7" tintColor="#4b5563"/> 
          </View>
          <View className="justify-center">
            <Text className="font-wmedium">{title}</Text>
            <Text className="text-gray-500 break-words font-wlight">{name}</Text>
          </View>
          </View>
    </TouchableOpacity>
  )
}
export default Detail