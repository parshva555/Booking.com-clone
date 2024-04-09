import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import {useDispatch} from 'react-redux'
import { savedPlaces } from "../SavedReducer";
const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Booking Confirmation",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);
  const dispatch = useDispatch();
  const confirmBooking = () => {
    dispatch(savedPlaces(route.params))
    navigation.navigate("Main")
  }
  return (
    <View>
      <Pressable style={{ backgroundColor: "white", margin: 10 }}>
        <View
          style={{
            marginHorizontal: 12,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ width: 250, fontSize: 25, fontWeight: "bold" }}>
              {route.params.name}
            </Text>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  marginTop: 5,
                }}
              >
                <MaterialIcons name="stars" size={24} color="green" />
                <Text>{route.params.rating}</Text>
                <View
                  style={{
                    backgroundColor: "#003580",
                    paddingVertical: 3,
                    borderRadius: 5,
                    width: 100,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 15,
                    }}
                  >
                    Genius Level
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ margin: 12, flexDirection: "row", gap: 60 }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>
              Check In
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#007fff" }}
            >
              {route.params.startDate}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>
              Check Out
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#007fff" }}
            >
              {route.params.endDate}
            </Text>
          </View>
        </View>
        <View style={{ margin: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>
            Rooms and Guests
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#007fff" }}>
            {route.params.availableRooms} rooms {route.params.adults} adults{" "}
            {route.params.children} children
          </Text>
        </View>
        <Pressable
        onPress = {confirmBooking}
          style={{
            backgroundColor: "#003580",
            width: 120,
            padding: 5,
            marginHorizontal: 12,
            marginBottom: 20,
            borderRadius:4
          }}
        >
          <Text style={{textAlign:'center',color:'white',fontSize:15, fontWeight:"bold"}}>Book Now</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
