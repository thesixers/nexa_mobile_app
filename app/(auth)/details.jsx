import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useState} from 'react'
import { ChevronDown, XIcon, ArrowLeft } from 'lucide-react-native'
import { icons } from '../../constants'
import { router, useLocalSearchParams } from 'expo-router'

const details = () => {
  const [details, setDetails] = useState({
    name: "",
    email: ""
  })

  const addDetails = () =>{
    if(!details.name || !details.email) return;
    // Alert.alert("success", "details added successfully")
    router.replace('/(main)/calllog')
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
        <View className="w-full py-3 ">
            <Text className="w-full text-center text-2xl p-3 font-wmedium">New To Nexa? </Text>
            <Text className="w-full text-center text-gray-500 p-2 font-wlight">
                Please fill in your details to continue
            </Text>
            <View className="mt-3 w-[85%] m-auto flex flex-column gap-5 ">
            <View className="w-full p-2  justify-center flex flex-column gap-3">
                    <Text className="text-gray-500">Username</Text>
                    <TextInput 
                      placeholder='Enter your username'
                      keyboardType="default"
                        style={{
                            borderBottomWidth: 1, width: "100%",
                            borderColor: "#2563eb", paddingBottom: 15,
                             paddingTop: 15, paddingLeft: 12
                        }} 
                        className="font-wlight"
                        value={details.name}
                        onChangeText={(text) => setDetails({...details, name: text})}
                    />
                </View>
                <View className="w-full p-2 justify-center flex flex-column gap-1">
                    <Text className="text-gray-500">Email:</Text>
                    <TextInput 
                      placeholder='example@gmail.com'
                      keyboardType= "email-address"
                        style={{
                            borderBottomWidth: 1, width: "100%",
                            borderColor: "#2563eb", paddingBottom: 15,
                             paddingTop: 15, paddingLeft: 12
                        }} 
                        className="font-wlight" 
                        value={details.email}
                        onChangeText={(text) => setDetails({...details, email: text})}
                    />
                </View>
                <TouchableOpacity 
                    className="w-full bg-blue-600 rounded-full mt-10"  
                    style={{width: "80%", margin: "auto"}}
                    onPress={addDetails}
                >
                    <Text className="w-full text-center text-white py-3 px-5">Next</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
     
    </SafeAreaView>
  )
}

export default details