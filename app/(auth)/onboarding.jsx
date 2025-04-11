import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { images } from '../../constants'
import { Link, router } from 'expo-router'

const Onboarding = () => {
  return (
    <View className="justify-end items-center w-full h-[85%] p-5 gap-3">
        <Image source={images.appImage} className="w-[200px] h-[200px] rounded-full" />
        <Text className="text-[40px] color-blue-600 font-wsemibold">Welcome to Nexa</Text>
        <View className="w-[263px] px-1">
          <Text className="color-gray-500 font-wlight text-center">
            Read our <Link href="" className='color-blue-400'>Privacy Policy</Link>. Tap "Agree & Continue" to accept the <Link href="" className='color-blue-400'>terms and condition</Link>
          </Text>
        </View>
        <TouchableOpacity className="w-[250px] h-[40px] bg-blue-600 items-center justify-center rounded-full mt-10"
          onPress={() => {
            router.replace('/sign')
          }}
        >
          <Text className="color-white">Agree & Continue</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Onboarding