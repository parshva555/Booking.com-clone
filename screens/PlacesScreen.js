import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {useRoute, useNavigation} from '@react-navigation/native'
import { useLayoutEffect } from 'react'
const PlacesScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
          title: "Popular Places",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            marginLeft: 115,
          },
          headerStyle: {
            backgroundColor: "#003580",
            height: 110,
            borderBottomColor: "transparent",
            shadowColor: "transparent",
          },

        });
      }, []);
    console.log(route.params)
  return (
    <View>
      <Text>PlacesScreen</Text>
    </View>
  )
}

export default PlacesScreen

const styles = StyleSheet.create({})