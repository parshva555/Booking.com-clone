import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

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

  const confirmBooking = async () => {
    const res = await fetch(`https://booking-backend-1-pmsm.onrender.com/api/users/user-details`, {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Error fetching user details");
    }

    const userDetails = await res.json();

    console.log(userDetails);

    const newBooking = {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      adultCount: route.params.adults,
      childCount: route.params.children,
      checkIn: route.params.startDate,
      checkOut: route.params.endDate,
      totalCost: route.params.price,
    };

    const response = await axios.post(`https://booking-backend-1-pmsm.onrender.com/api/booking/${route.params.id}/bookings`, newBooking, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }}
    );

    navigation.navigate("Main");
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
            Guests
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#007fff" }}>
            {route.params.adults} adults{" "}
            {route.params.children} children
          </Text>
        </View>
        <View style={{ margin: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>
            Price
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#007fff" }}>
            Rs. {route.params.price}
          </Text>
        </View>
        <Pressable
          onPress={confirmBooking}
          style={{
            backgroundColor: "#003580",
            width: 120,
            padding: 5,
            marginHorizontal: 12,
            marginBottom: 20,
            borderRadius: 4
          }}
        >
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontWeight: "bold" }}>Book Now</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
