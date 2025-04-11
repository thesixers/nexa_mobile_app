import { View, Text, FlatList, Image, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { callHistory, formatDate, getFirstLetter} from '../../utils'
import { icons } from "../../constants"
import Header from '../../components/Header'


const Log = ({item: { id, name, date, time, type, duration }}) => {

  return(
    <TouchableOpacity activeOpacity={0.8} className="flex-row items-center p-2">
              <View className="border border-1 border-secondary-100 p-2 w-[50px] h-[50px] rounded-full justify-center items-center">
                  <View className="bg-secondary-100 w-[50px] h-[50px] rounded-full justify-center items-center">
                  <Text className="text-white font-wmedium text-[18px]">{getFirstLetter(name)}</Text>
                  </View>
              </View>
              <View className="px-1  flex-1 gap-1 h-full">
                <Text className="px-3 font-wlight">{name}</Text>
                <View className="flex-row px-3">
                  <Image 
                      source={icons.incoming1}
                      className="w-5 h-5"
                  />
                  <Text className="text-gray-500">{formatDate(date)}, {time}</Text>
                </View>
              </View>
              <TouchableOpacity className="flex-row  h-full w-10 items-center justify-center">
                <Image source={type === "Video" ? icons.video : icons.phone} className="w-7 h-7"/>
              </TouchableOpacity>
    </TouchableOpacity>
  )
}

const Calllog = () => {
  const favs = [
    { id: 1, name: 'John Doe', phoneNumber: '+2347012345678', status: 'Online'},
    { id: 2, name: 'Jane Smith', phoneNumber: '+2347023456789', status: 'Offline' },
    { id: 3, name: 'Michael Johnson', phoneNumber: '+2347034567890', status: 'Online' },
  ]

  const addToFav = () => {
    Alert.alert("Success", "Contact added to favourite")
  }



  return (
    <SafeAreaView className="bg-primary h-full">
      <Header />
      <FlatList  
        data={callHistory}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <Log item={item}  />
        )}
        ListHeaderComponent={() => (
          <View className="gap-2 p-2 bg-gray-50 w-full">
            <Text className="text-[18px] font-wmedium">Favourites</Text>
            <FlatList 
              data={favs}
              keyExtractor={(item, index) => index}
              renderItem={({item}) => (
                <TouchableOpacity className="w-[80px] px-2  justify-center items-center">
                    <View className="border border-1 border-secondary-100 p-2 w-[50px] h-[50px] rounded-full justify-center items-center">
                      <View className="bg-secondary-100 w-[50px] h-[50px] rounded-full justify-center items-center">
                      <Text className="text-white font-wmedium text-[18px]">{getFirstLetter(item.name)}</Text>
                      </View>
                  </View>
                  <Text className="w-full text-center text-[8px] font-wbold"> {item.name}</Text>
                </TouchableOpacity>
              )}
              ListHeaderComponent={() => (
                <TouchableOpacity className="w-[80px] px-2  justify-center items-center" 
                  onPress={() => { addToFav()}}
                >
                    <View className="border border-1 border-blue-300 p-2 w-[50px] h-[50px] rounded-full justify-center items-center">
                      <View className="bg-blue-300 w-[50px] h-[50px] rounded-full justify-center items-center">
                      <Text className="text-white font-wmedium text-[35px] items-center justify-center">+</Text>
                      </View>
                  </View>
                  <Text className="w-full text-center text-[8px]"> Add </Text>
                </TouchableOpacity>
              )}
              style={{backgroundColor: "#f9fafb", paddingTop: 5, paddingLeft: 5}}
              horizontal
            />
            <Text>Recent Calls</Text>
          </View>
        )}
        style={{backgroundColor: "#f9fafb", paddingTop: 5, paddingLeft: 10}}
      />
    </SafeAreaView>
  )
}

export default Calllog