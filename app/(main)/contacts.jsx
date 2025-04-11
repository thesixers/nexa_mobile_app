import { View, Text, FlatList, Image, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { callHistory, contacts, formatDate, getFirstLetter} from '../../utils'
import { usePathname, router } from 'expo-router'
import Header from '../../components/Header'


const Log = ({item}) => {
  const pathname = usePathname()
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(JSON.stringify(item))
  }, [])

  return(
    <TouchableOpacity 
    activeOpacity={0.8} 
    className="flex-row items-center p-2" 
      onPress={() => {
          if(!user) return;
        if(pathname.startsWith("/display"))
          router.setParams( user )
        else
          router.push(`/display/${user}`)
      }}
    >
              <View className="border border-1 border-secondary-100 p-2 w-[50px] h-[50px] rounded-full justify-center items-center">
                  <View className="bg-secondary-100 w-[50px] h-[50px] rounded-full justify-center items-center">
                  <Text className="text-white font-wmedium text-[18px]">{getFirstLetter(item.name)}</Text>
                  </View>
              </View>
              <View className="px-1  flex-1">
                <Text className="px-3 font-wlight">{item.name}</Text>
              </View>
    </TouchableOpacity>
  )
}

const Contacts = () => {
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
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
            <Log item={item}  />
        )}
        ListHeaderComponent={() => (
          <View className="gap-2 p-2">
            <Text className="text-[18px] font-wmedium text-gray-400">{contacts.length} contacts on Nexa</Text>
          </View>
        )}
        style={{backgroundColor: "#f9fafb", paddingTop: 5, paddingLeft: 10}}
      />
    </SafeAreaView>
  )
}

export default Contacts