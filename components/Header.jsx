import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import SearchInput from './searchInput'

const Header = () => {
    const [toggleSearch, setToggleSearch] = useState(false)
  return (
    <View className="flex flex-row p-3 items-center" style={{borderBottomWidth: 1, borderBottomColor: "#e5e7eb"}}>
    <View className="flex-1 flex flex-row  w-full items-center">
        {
            !toggleSearch ? 
            <Text className=" text-[35px] color-blue-500 font-wsemibold">Nexa</Text>
            :
            <SearchInput setToggleSearch={setToggleSearch} toggleSearch={toggleSearch} />
        }
    </View>
    <View className="flex flex-row gap-2 items-center justify-between h-full">
    {
        !toggleSearch && (
            <TouchableOpacity 
            onPress={() => { setToggleSearch(!toggleSearch)}}
            >
                <Image source={icons.search} className="w-[20px] h-[20px]" resizeMode='contain' tintColor="black"/>
            </TouchableOpacity>
        )
    }
    <TouchableOpacity  
      onPress={() => {}}
      className="w-5"
      >
        <Image source={icons.menu} className="w-6 h-6" resizeMode='contain' tintColor="black"/>
      </TouchableOpacity>
    </View>
</View>
  )
}

export default Header