import {
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedDates,setSelectedDates] = useState()
  console.log(selectedDates)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Booking.com",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginLeft: 100,
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);

  const customButton = (onConfirm) => {
    return (
      <Button
      onPress={onConfirm}
      style={{
        container:{width:"80%", marginHorizontal:"3%"},
        text:{fontSize:20}
      }}
      primary
      title="Submit"
      />
    )
  }

  return (
    <View>
      <Header />
      <ScrollView>
        <View
          style={{
            margin: 20,
            borderColor: "#FFC72C",
            borderWidth: 3,
            borderRadius: 6,
          }}
        >
          {/* Destination */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <Feather name="search" size={24} color="black" />
            <TextInput placeholder="Enter your Destination" />
          </Pressable>

          {/* Selected Dates */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              paddingHorizontal: 10,
              borderColor: "#FFC72C",
              borderWidth: 2,
              paddingVertical: 15,
            }}
          >
            <Feather name="calendar" size={24} color="black" />
            <DatePicker
              style={{
                width: 250,
                height: 30,
                borderRadius:0,
                borderWidth:0,
                borderColor:'transparent'
              }}
              customStyles={{
                placeholderText: {
                  fontSize: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "auto",
                },
                headerStyle: {
                  backgroundColor: "#0035ab",
                },
                contentText: {
                  fontSize: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "auto",
                },
              }}
              selectedBgColor="#0047AB"
              customButton={(onConfirm) => customButton(onConfirm)}
              onConfirm={(startDate,endDate) => setSelectedDates(startDate,endDate)}
              allowFontScaling={false}
              placeholder={"April 27, 2021 ->  April 28, 2021"}
              mode={"range"}
            />
          </Pressable>

          {/* Rooms and Guests */}
          <Pressable></Pressable>

          {/* Search Button */}
          <Pressable></Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
