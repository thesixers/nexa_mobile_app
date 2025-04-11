import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState} from 'react'
import { Tabs } from "expo-router"
import { icons } from '../../constants'
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { StatusBar } from 'expo-status-bar';



const TabIcon = ({icon, color, name, focused}) => {
  const width = useSharedValue(0);
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    width.value = withTiming(expanded ? 0 : 80, { duration: 300 });
    setExpanded(!expanded);
  };

  // style={[styles.box, { width }]}
  return(
      <View className=" w-[100px] h-[60px] items-center justify-center gap-2 mt-5">
          <View className={`h-[25px] rounded-2xl items-center justify-cente`}>
            <Image
            source={icon}
            resizeMode='contain'
            className = "w-7 h-7"
            tintColor={color}
            re
            />
          </View>
          <Text className={`${focused ? "text-secondary-100" : ""}`}>
              {name}
          </Text>
      </View>
  )
}

const MainLayout = () => {
  return (
    <>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle:{
              paddingTop: 10,
              height: 80,
              backgroundColor: "white",
            },
            tabBarActiveTintColor: "#2563eb",
            tabBarInactiveTintColor: ""
          }}
        >
          <Tabs.Screen 
                name='calllog'
                options={{
                    title: 'Calls',
                    headerShown: false,
                    tabBarIcon: ({ color, focused}) => (
                        <TabIcon icon={icons.calls} color={color} focused={focused} name="Calls"/>
                    )
                    
                }}
            />

          <Tabs.Screen 
                name='contacts'
                options={{
                    title: 'Contacts',
                    headerShown: false,
                    tabBarIcon: ({ color, focused}) => (
                        <TabIcon icon={icons.contact} color={color} focused={focused} name="Contacts"/>
                    )
                    
                }}
            />

          <Tabs.Screen 
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused}) => (
                        <TabIcon icon={icons.profile2} color={color} focused={focused} name="Profile"/>
                    )
                    
                }}
            />
        </Tabs>
        <StatusBar backgroundColor='white' style='dark' />
    </>
  )
}

const styles = StyleSheet.create({
  box: {},
});

export default MainLayout