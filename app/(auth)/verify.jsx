import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import { ChevronDown, XIcon, ArrowLeft } from 'lucide-react-native'
import { icons } from '../../constants'
import { router, useLocalSearchParams } from 'expo-router'

const verify = () => {
  let { phone } = useLocalSearchParams()

  const verifyOtp = () =>{
    // Alert.alert("success", "Otp verified successfully")
    router.push("/details")
  }

  return (
    <SafeAreaView className="bg-white h-full relative">
      <View className="px-3 py-1 h-[60px] w-full flex flex-row items-center">
        <TouchableOpacity className="flex-1"
            onPress={() => {router.back()}}
        >
            <ArrowLeft color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image source={icons.menu} className="w-6 h-6" resizeMode='contain' tintColor="black" />
        </TouchableOpacity> 
      </View>
      <View>
        <View className="w-full py-3">
            <Text className="w-full text-center text-2xl p-3 font-wmedium">Verify Your Phone Number</Text>
            <Text className="w-full text-center text-gray-500 p-2 font-wlight">
                SMS has been sent to <Text className="font-wsemibold">{phone}</Text>
            </Text>
            <View>
                  <Text className="text-red-500 text-center text-sm">Incorrect otp</Text>
            </View>
            <View>
                <View className="w-full p-2 flex flex-row justify-center gap-3">
                    <TextInput 
                      placeholder='0000'
                      keyboardType='number-pad'  
                        style={{
                            borderBottomWidth: 2, width: 160,
                            borderColor: "#2563eb", textAlign: "center"
                        }} 
                        className="font-wlight"
                    />
                </View>
            </View>
        </View>
      </View>
      <TouchableOpacity 
        className="w-[60px] bg-blue-600 rounded-full" 
        style={{width: "80%", margin: "auto"}}
        onPress={verifyOtp}
      >
        <Text className="w-full text-center text-white py-3 px-5">Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default verify