import { Dimensions, Image, ActivityIndicator, StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

const BookingScreen = () => {
  const [bookings, setBookings] = useState();
  const [loading, setLoading] = useState(true);
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  useEffect(() => {
    async function getBookings() {
      const response = await fetch("https://booking-backend-1-pmsm.onrender.com/api/booking/get-bookings", {
        credentials: "include",
      });

      const data = await response.json();
      setBookings(data);
      setLoading(false);
    }

    getBookings();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Bookings",
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
  }, [loading]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Or your preferred loading UI
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {bookings.length > 0 && bookings.map((item, index) => (
          <Pressable
            key={index}
            style={{
              backgroundColor: "white",
              marginVertical: 10,
              marginHorizontal: 20,
              borderColor: "#E0E0E0",
              borderWidth: 1,
              padding: 14,
              borderRadius: 6,
            }}
          >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
              <Image
                style={{ height: height / 4, width: width - 280 }}
                source={{ uri: item.imageUrls[0] }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 7,
                }}
              >
                <MaterialIcons name="stars" size={24} color="green" />
                <Text style={{ marginLeft: 3, fontSize: 15, fontWeight: "400" }}>
                  {item.starRating}
                </Text>
                <Text style={{ marginLeft: 3 }}>•</Text>
                <View
                  style={{
                    padding: 6,
                    borderRadius: 4,
                    width: 100,
                    backgroundColor: "#0039a6",

                    marginLeft: 4,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "400",
                    }}
                  >
                    Genius Level
                  </Text>
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
                  {item.startDate}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>
                  Check Out
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#007fff" }}
                >
                  {item.endDate}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default BookingScreen

const styles = StyleSheet.create({})
