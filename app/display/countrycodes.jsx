import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { countryPhoneCodes } from '../../utils'
import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'
import { icons } from '../../constants'
import SearchInput from '../../components/searchInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/GlobalProvider'

const Country = ({item: { country, code, flag}}) => {
  const { setUserCountry } = useGlobalContext()

    return (
        <TouchableOpacity
            // activeOpacity={0.8} 
            className="flex-row items-center px-5 py-1 w-full h-[60px] " 
              onPress={() => {
                 setUserCountry({country, code, flag})
                 router.back()
              }}
            >
            <View className="flex-1 flex-row w-full h-full items-center gap-5">
            <Image source={{uri: `https://flagcdn.com/w40/${flag}`}} className="w-4 h-4" />
                <Text className="font-wmedium text-xl text-gray-500" >
                {`${country}`}
                </Text>
            </View>
            <View className="p-1">
                <Text className="" style={{color: "#3b82f6"}}>{code}</Text>
            </View>
        </TouchableOpacity>
    )
}

const CountryCodes = () => {
  const [toggleSearch, setToggleSearch] = useState(false)


  return (
    <>
    <SafeAreaView className="bg-primary h-full">
        <View className="flex flex-row py-3 px-3" style={{borderBottomWidth: 1, borderColor: "#e5e7eb"}}>
          <TouchableOpacity className="justify-center w-[40px]"
            onPress={() => {
              router.back()
            }}
          >
            <ArrowLeft style={{ width: 20, height: 20 }} color="black" />
          </TouchableOpacity>
          <View className={`${!toggleSearch && ("flex-1")} justify-center`}>
            {
              !toggleSearch && (<Text className="text-2xl font-wsemibold" >Choose Country</Text>)
            }
          </View>
          {
            toggleSearch ? <SearchInput setToggleSearch={setToggleSearch} toggleSearch={toggleSearch} /> :  
            <TouchableOpacity 
            onPress={() => { setToggleSearch(!toggleSearch)}}
            className="p-2 "
            >
                <Image source={icons.search} className="w-[20px] h-[20px]" resizeMode='contain' tintColor="black"/>
            </TouchableOpacity>
          }
        </View>
      <FlatList 
        data={countryPhoneCodes}
        keyExtractor={(item, index) => index}
        renderItem={({item}) => (
            <Country item={item}  />
        )}
      />
    </SafeAreaView>
    </>
  )
}

export default CountryCodes