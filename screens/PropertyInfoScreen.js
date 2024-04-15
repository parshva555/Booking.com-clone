import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { pixelNormalize } from "../components/Normalise";
import Amenities from "../components/Amenities";

const PropertyInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [showButton, setShowButton] = useState(false);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition > 60) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `${route.params.name}`,
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

  return (
    <SafeAreaView>
      <ScrollView onScroll={handleScroll}>
        <Pressable
          style={{ flexDirection: "row", flexWrap: "wrap", margin: 10, justifyContent: "center" }}
        >
          {route.params.photos.map((photo, index) => (
            <View key={index} style={{ margin: 5 }}>
              <Image
                style={{
                  width: 120,
                  height: pixelNormalize(80),
                  borderRadius: pixelNormalize(4),
                }}
                source={{ uri: photo }}
              />
            </View>
          ))}
        </Pressable>
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

          <View
            style={{
              backgroundColor: "#17b169",
              paddingHorizontal: 6,
              paddingVertical: 4,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white", fontSize: 13 }}>
              Travel Sustainable
            </Text>
          </View>
        </View>
        <Text
          style={{
            borderColor: "#e0e0e0",
            borderWidth: 3,
            height: 1,
            marginTop: 20,
          }}
        />
        <Text
          style={{
            marginTop: 10,
            fontSize: 17,
            fontWeight: 500,
            marginHorizontal: 12,
          }}
        >
          Price for 1 Night and {route.params.adults} adults
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 12,
            marginTop: 4,
            gap: 8,
          }}
        >
          <Text style={{ color: "black", fontSize: 20 }}>
            Rs {route.params.price * route.params.adults}
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 12,
            marginTop: 7,
            backgroundColor: "green",
            paddingHorizontal: 4,
            paddingVertical: 5,
            width: 75,
            borderRadius: 5,
          }}
        >
        </View>
        <Text
          style={{
            borderColor: "#e0e0e0",
            borderWidth: 3,
            height: 1,
            marginTop: 15,
          }}
        />
        <View style={{ margin: 12, flexDirection: "row", gap: 60 }}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>
              Check In
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#007fff" }}
            >
              {route.params.selectedDates.startDate}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>
              Check Out
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#007fff" }}
            >
              {route.params.selectedDates.endDate}
            </Text>
          </View>
        </View>
        <View style={{ margin: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>
            Rooms and Guests
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#007fff" }}>
            {route.params.rooms} rooms {route.params.adults} adults{" "}
            {route.params.children} children
          </Text>
        </View>
        <Text
          style={{
            borderColor: "#e0e0e0",
            borderWidth: 3,
            height: 1,
            marginTop: 15,
          }}
        />
        <Amenities />
        <Text
          style={{
            borderColor: "#e0e0e0",
            borderWidth: 3,
            height: 1,
            marginTop: 155,
          }}
        />
      </ScrollView>
      {showButton && (
        <Pressable
          onPress={() =>
            navigation.navigate("Confirmation", {
              price: route.params.price,
              name: route.params.name,
              children: route.params.children,
              adults: route.params.adults,
              rating: route.params.rating,
              startDate: route.params.selectedDates.startDate,
              endDate: route.params.selectedDates.endDate,
            })
          }
          style={{
            backgroundColor: "#6cb4ee",
            position: "absolute",
            bottom: 15,
            padding: 13,
            width: "95%",
            marginHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 17 }}>
            Book Hotel
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default PropertyInfoScreen;

const styles = StyleSheet.create({});
