import React, { useState, useEffect } from 'react';
import { Dimensions, Image, ActivityIndicator, StyleSheet, Text, View, SafeAreaView, Pressable, ScrollView, Alert } from 'react-native';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import { useLayoutEffect } from 'react';
const BookingScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "My Bookings",
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

  useEffect(() => {
    async function getBookings() {
      try {
        const response = await fetch("https://booking-backend-1-pmsm.onrender.com/api/booking/get-bookings", {
          credentials: "include",
        });

        const data = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    getBookings();
  }, []);

  const handleDeleteBooking = async (bookingId) => {
    try {
      console.log("Deleting booking with ID:", bookingId);
      const response = await fetch(`https://booking-backend-1-pmsm.onrender.com/api/booking/${bookingId}`, {
        method: 'DELETE',
        credentials: "include",
      });

      console.log("Response status:", response.status);
      if (response.ok) {
        console.log("Booking deleted successfully");
        // Optionally, you can refresh the list of bookings after deletion
        refreshBookings();
      } else {
        throw new Error("Failed to delete booking");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to delete booking. Please try again later.");
    }
  };

  const refreshBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://booking-backend-1-pmsm.onrender.com/api/booking/get-bookings", {
        credentials: "include",
      });
      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Use useFocusEffect hook to refresh bookings when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      refreshBookings();
    }, [])
  );

  return (
    <SafeAreaView>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          bookings.length > 0 ? (
            bookings.map((item, index) => (
              <View
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
                <Pressable
                  onPress={() => handleDeleteBooking(item.bookings[index]._id)}
                  style={{ position: "absolute", top: 10, right: 10 }}
                >
                  <MaterialIcons name="delete" size={24} color="red" />
                </Pressable>

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
              </View>
            ))
          ) : (
            <Text style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}>
              NO BOOKINGS
            </Text>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingScreen;
