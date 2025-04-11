import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { ArrowLeft, XIcon } from 'lucide-react-native'

const SearchInput = ({ setToggleSearch, toggleSearch}) => {
  return (
    <View className="border border-1 flex-1 border-white rounded-[50px] bg-gray-200 px-5 h-[50px] items-center flex flex-row">  
      <TouchableOpacity 
        onPress={() => { setToggleSearch(!toggleSearch)}}
      > 
      <XIcon color="black" />
      </TouchableOpacity>
      <TextInput className="flex-1"  placeholder='Search....'/>
    </View>
  )
}

export default SearchInput