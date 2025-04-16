import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='onboarding'
        options={{
            headerShown: false
        }}
      />
      <Stack.Screen
        name='sign'
        options={{
            headerShown: false
        }}
      />
      <Stack.Screen
        name='verify'
        options={{
            headerShown: false
        }}
      />
      <Stack.Screen
        name='details'
        options={{
            headerShown: false
        }}
      />
      
    </Stack>
  )
}

export default AuthLayout