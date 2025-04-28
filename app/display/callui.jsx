import { View, Text, Image, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { 
  ArrowLeft, 
  ArrowRight, 
  PhoneIcon, 
  MicOffIcon,
  Volume2
} from 'lucide-react-native'
import { router } from 'expo-router'
import { useCallContext } from '../../context/callContext'
import useCallStore from '../../store/useCallStore'
import Avata from '../../components/Avata'

function Btn({handlepress, children, customStyles}){

  return (
    <TouchableHighlight
    onPress={handlepress}
    underlayColor="#bfdbfe"
    className={`
      flex flex-row justify-center 
      items-center rounded-full 
      w-[50px] h-[50px] ${customStyles}
      top-[5px]
      `}
  >
    <View
    >
   {children}
    </View>
  </TouchableHighlight>
  )
}

const Callui = () => {
  const [isMute, setIsMute] = useState(false)
  const [isSpeakerLoud, setIsSpeakerLoud] = useState(false)
  const { calls, pendingCalls } = useCallStore()

  // console.log(calls, pendingCalls);


  return (
    <SafeAreaView>
      <View className="h-full bg-white">
        <View className="flex flex-row w-full absolute h-[60px]">
            <Btn handlepress={() => {router.back()}} customStyles={"absolute left-2 bg-blue-400"}>
              <ArrowLeft width={30} height={30}  color={"white"}/>
            </Btn>
            <View className="flex-1 flex justify-center items-center h-full">
              <Text className="text-xl font-bold">Nnamdi</Text>
              <Text className="text-gray-400">Calling...</Text>
            </View>
        </View>

        <View className="w-full h-full flex justify-center items-center">
          <Avata name="Nnamdi" height={200} width={200} textsize={50}/>
        </View>
            
        <View className="
          w-[200px] h-[60px]  rounded-full
          flex flex-row justify-center bg-blue-400
          gap-3 absolute bottom-10 left-[75px]
        ">
            <Btn handlepress={() => {}} customStyles={"bg-blue-300"}>
              <Volume2 width={30} height={30}  color={"white"}/>
            </Btn>
            <Btn handlepress={() => {}} customStyles={"bg-blue-300"}>
              <MicOffIcon width={30} height={30}  color={"white"}/>
            </Btn>
            <Btn handlepress={() => {}} customStyles={"bg-blue-300"}>
              <PhoneIcon width={30} height={30}  color={"white"}/>
            </Btn>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Callui