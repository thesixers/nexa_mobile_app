import { View, Text, Image, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import { userProfile } from '../../utils'
import { ArrowLeft, Info, Phone, Video, MessageSquareText } from "lucide-react-native";
import Detail from "../../components/Detail"

const Profile = () => {
  return (
    <SafeAreaView>
     <ScrollView>
        <View className="w-full h-[250px] py-0 overflow-hidden relative">
          <Image source={userProfile.profilePicture} className="w-full h-full"  resizeMode='cover'/>
          <View style={{
            position: "absolute", bottom: 5, width: "100%", 
            height: 30, 
            alignItems: "center",
          }}
            >
            <View style={{
                width: 150, 
                height: 30, display: "flex", 
                flexDirection: "row" , justifyContent: "space-between", 
                alignItems: "center", paddingLeft: 10,
                paddingRight: 10, borderRadius: 50
              }}>
              <TouchableOpacity>
                <Text><Phone style={{ width: 20, height: 20 }} color="rgba(0, 0, 0, 0.705)" /></Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text><Video style={{ width: 20, height: 20 }} color="rgba(0, 0, 0, 0.705)" /></Text>
              </TouchableOpacity>
              <TouchableOpacity>
              <Text><MessageSquareText style={{ width: 20, height: 20 }} color="rgba(0, 0, 0, 0.705)" /></Text>
              </TouchableOpacity>
              </View>
        </View>
        <TouchableOpacity 
        className="w-[40px] h-[40] 
         rounded-full absolute 
         right-3 justify-center items-center"  
         >
          <Image source={icons.logout} 
          tintColor="gray" 
          resizeMode='contain' 
          className="w-[22px] ml-2"
          />
        </TouchableOpacity>
        </View>

      <ScrollView>
        <Detail  name={userProfile.name} title="Name" icon={icons.profile} />
        <Detail  name={userProfile.bio} title="Bio" icon={icons.profile} />
        <Detail  name={userProfile.phoneNumber} title="Phone" icon={icons.phone} />
      </ScrollView>
     </ScrollView>
    </SafeAreaView>
  )
}

export default Profile