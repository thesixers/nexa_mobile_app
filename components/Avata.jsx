import { View, Text } from 'react-native'
import React from 'react'
import { getFirstLetter } from '../utils'

const Avata = ({name, width, height, textsize}) => {
  return (
   <View
        className="
        border border-1 border-blue-500
        p-1 rounded-full justify-center items-center
        "
        style={{width: width, height: height}}
      >
        <View className="bg-blue-400 w-full h-full rounded-full justify-center items-center">
        <Text 
        className="text-white font-wmedium 
        text-[58px] w-[58px] h-[58px] text-center 
        rounded-full"
        style={{width: textsize, height: textsize, fontSize: textsize}}
        >{getFirstLetter(name)}</Text>
        </View>
    </View>
  )
}

export default Avata