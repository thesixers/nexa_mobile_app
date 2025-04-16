import { View, Text, TextInput, Image, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronDown, XIcon, ArrowLeft } from 'lucide-react-native'
import { icons } from '../../constants'
import { router, useLocalSearchParams } from 'expo-router'
import { countryPhoneCodes } from '../../utils'
import { useGlobalContext } from '../../context/GlobalProvider'

const sign = () => {
    const { setUserCountry, userCountry } = useGlobalContext()
    const [usersPhone, setUsersPhone] = useState("")

    function changeCountry(){
        if(!userCountry) setUserCountry(countryPhoneCodes[0])
    }

    useEffect(() => {
        changeCountry()
    }, [])

    const handleText = (text) => {
        const filter = text.replace(/[^0-9]/g, '');
        // const clean = filter.replace(/\s/g, "");
        // const formatted = clean.replace(/(.{3})/g, '$1 ')
        setUsersPhone(filter)
    }

    const getOtp = () => {
        const phone = `${userCountry?.code}${usersPhone}`
        if(!usersPhone) return

        // try {

            
        // } catch (error) {
        //     console.log(error);
        // }
        // Alert.alert("Success", "Otp is sent to ur phone number: " + phone) 
        router.push({
            pathname: '/verify',
            params: {
                phone
            }
        })
    } 
    
  return (
    <SafeAreaView className="bg-white h-full relative">
      <View className="px-3 py-1 h-[60px] w-full flex flex-row items-center">
        <TouchableOpacity className="flex-1"
            onPress={() => {router.replace('/onboarding')}} 
        >
            <XIcon color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
            <Image source={icons.menu} className="w-6 h-6" resizeMode='contain' tintColor="black" />
        </TouchableOpacity> 
      </View>
      <View>
        <View className="w-full py-1">
            <Text className="w-full text-center text-2xl p-3 font-wmedium ">Enter Your Phone Number</Text>
            <Text className="w-full text-center text-gray-500 p-2 font-wlight">
                Nexa will need to verify your phone number. {"\n"}Network charges may apply
            </Text>

            <View className="pt-7">
                <View className="w-full items-center p-2" >
                    <TouchableOpacity 
                    style={{
                        borderBottomWidth: 1, borderColor: "#2563eb", 
                        width: 220, position: "relative", 
                        alignItems: "center", padding: 5, display: "flex",
                        flexDirection: "row", justifyContent: "center", gap: 10
                        }}
                        onPress={() => {
                            router.push('/display/countrycodes')
                        }}
                    > 
                        <Image source={{uri: `https://flagcdn.com/w40/${userCountry?.flag}`}} className="w-4 h-4" />
                        <Text className="font-wlight">{userCountry?.country}</Text>
                        <ChevronDown 
                            color="#2563eb" 
                            style={{
                                position: "absolute", 
                                right: 0, bottom: 0
                                }}
                        />
                    </TouchableOpacity>
                </View>
                <View className="w-full p-2 flex flex-row justify-center gap-3">
                    <Text 
                    style={{
                        borderBottomWidth: 1, width: 50, 
                        height: 30, marginTop: 10,
                        textAlign: "center", letterSpacing: 1, 
                        borderColor: "#2563eb" 
                        }} 
                    className="font-wlight"
                    >{userCountry?.code}</Text>
                    <TextInput 
                        placeholder='Phone number' 
                        keyboardType='number-pad'  
                        style={{
                            borderBottomWidth: 2, width: 160,
                            borderColor: "#2563eb"
                        }} 
                        className="font-wlight"
                        value={usersPhone}
                        onChangeText={handleText}
                    />
                </View>
            </View>
        </View>
      </View>
      <TouchableOpacity 
        className="w-[60px] bg-blue-600 rounded-full" 
        style={{width: "80%", margin: "auto"}}
        onPress={getOtp}
      >
        <Text className="w-full text-center text-white py-3 px-5">Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default sign