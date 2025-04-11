import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { ArrowLeft, Phone, Video, MessageSquareText  } from "lucide-react-native";
import Detail from '../../components/Detail'
import { useLocalSearchParams, router } from "expo-router";
import { getFirstLetter, userProfile } from "../../utils";

const Profiles = () => {
  const p = useLocalSearchParams();
  let user = JSON.parse(p.user)

  return (
    <SafeAreaView className="absolute top-0 w-full h-full">
      <ScrollView className="w-full h-100% bg-white">
        <View className="flex flex-row py-3 px-3">
          <TouchableOpacity className="justify-center w-[40px]"
            onPress={() => {
              router.back()
            }}
          >
            <ArrowLeft style={{ width: 20, height: 20 }} color="black" />
          </TouchableOpacity>
          <View className="flex-1 justify-center">
            <Text className="text-2xl font-wsemibold ">{user.name}</Text>
          </View>
          <TouchableOpacity className="px-3 py-2">
            <Image
              source={icons.menu}
              className="w-6 h-6"
              resizeMode="contain"
              tintColor="black"
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
        <View className="w-full h-[250px] py-0 overflow-hidden relative">
          {
            !user.avatar ? 
            <View className="w-full h-full bg-blue-600 justify-center items-center">
                <Text className="color-white font-wsemibold" style={{fontSize: 70}}>{getFirstLetter(user.name)}</Text>
            </View>
            :
            <Image source={ user.avatar} className="w-full h-full"  resizeMode='cover'/>
          }
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
        </View>

      <ScrollView>
        <Detail  name={user.name} title="Name" icon={icons.profile} />
        <Detail  name="" title="Bio" icon={icons.profile} />
        <Detail  name={user.phoneNumber} title="Phone" icon={icons.phone} />
      </ScrollView>
     </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profiles;
