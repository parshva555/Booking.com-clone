import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';

const StackNavigator = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
    function BottomTabs(){
        return (
            <Tab.Navigator>
                <Tab.Screen name='Home' component={HomeScreen} options={{tabBarLabel:"Home", headerShown:false}}/>
            </Tab.Navigator>
        )
    }
  return (
    <View>
      <Text>StackNavigator</Text>
    </View>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})