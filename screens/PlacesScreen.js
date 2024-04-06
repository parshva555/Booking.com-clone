import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
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
  console.log(route.params);
  return (
    <View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          padding: 12,
          backgroundColor: "white",
        }}
      >
        <Pressable style={{flexDirection: "row", alignItems: "center"}}>
          <Octicons name="arrow-switch" size={22} color="gray" />
          <Text style={{fontSize:15,fontWeight:500,marginLeft:8}}>Sort</Text>
        </Pressable>
        <Pressable style={{flexDirection: "row", alignItems: "center"}}>
          <Ionicons name="filter" size={22} color="gray" />
          <Text style={{fontSize:15,fontWeight:500,marginLeft:8}}>Filter</Text>
        </Pressable>
        <Pressable style={{flexDirection: "row", alignItems: "center"}}>
        <Fontisto name="map-marker-alt" size={22} color="gray" />
          <Text style={{fontSize:15,fontWeight:500,marginLeft:8}}>Map</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({});
