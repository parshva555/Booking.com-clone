import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useEffect } from "react";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import PropertyCard from "../components/PropertyCard";
import axios from 'axios';
import {
  BottomModal,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";

const PlacesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectFilter, setSelectedFilter] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();

  useEffect(() => {
    async function fetchHotels() {
      await fetchHotelsByCity(route.params.place);
    }

    fetchHotels();
  })

  const filters = [
    {
      id: "0",
      filter: "cost:Low to High",
    },
    {
      id: "1",
      filter: "cost:High to Low",
    },
  ];
  // const fetchHotels = async () => {
  //   try {
  //     const response = await axios.get("https://booking-backend-1-pmsm.onrender.com/api/hotels");
  //     return response.data;
  //   } catch (error) {
  //     throw new Error("Error fetching hotels");
  //   }
  // };
  const fetchHotelsByCity = async (city) => {
    try {
      const response = await axios.get("https://booking-backend-1-pmsm.onrender.com/api/hotels/city", {
        params: { city: city }
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      throw new Error("Error fetching hotels");
    }
  };

  // const fetchHotelById = async (hotelId) => {
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/api/hotels/${hotelId}`);
  //     return response.data;
  //   } catch (error) {
  //     throw new Error("Error fetching hotel");
  //   }
  // };
  // const [sortedData, setSortedData] = useState(data)

  const compare = (a, b) => {
    if (a.newPrice > b.newPrice) {
      return -1;
    }
    if (a.newPrice < b.newPrice) {
      return 1;
    }
    return 0;
  }
  const comparison = (a, b) => {
    if (a.newPrice < b.newPrice) {
      return -1;
    }
    if (a.newPrice > b.newPrice) {
      return 1;
    }
    return 0;

  }
  const applyFilter = (filter) => {
    setModalVisible(false);
    switch (filter) {
      case "cost:High to Low":
        searchPlaces.map((val) => val.properties.sort(compare))
        setSortedData(searchPlaces)
        break;
      case "cost:Low to High":
        searchPlaces.map((val) => val.properties.sort(comparison))
        setSortedData(searchPlaces)
        break;
    }
  }
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
  }, [loading]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Or your preferred loading UI
  }

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
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Octicons name="arrow-switch" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: 500, marginLeft: 8 }}>
            Sort
          </Text>
        </Pressable>
        <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="filter" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: 500, marginLeft: 8 }}>
            Filter
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Map", {
          searchResults: searchPlaces
        })} style={{ flexDirection: "row", alignItems: "center" }}>
          <Fontisto name="map-marker-alt" size={22} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: 500, marginLeft: 8 }}>
            Map
          </Text>
        </Pressable>
      </Pressable>
      <ScrollView style={{ backgroundColor: "#f5f5f5" }}>
        {data
          .filter((item) => item.city === route.params.place)
          .map((hotel, index) => (
            <PropertyCard
              key={index}
              children={route.params.children}
              adults={route.params.adults}
              selectedDates={route.params.selectedDates}
              hotel={hotel}
            // availableRooms={property.rooms}
            // rooms={route.params.rooms}
            />
          ))}
      </ScrollView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        footer={
          <ModalFooter>
            <Pressable
              onPress={() => applyFilter(selectFilter)}
              style={{
                paddingRight: 10,
                marginLeft: "auto",
                marginRight: "auto",
                marginVertical: 10,
                marginBottom: 20
              }}
            >
              <Text>Apply</Text>
            </Pressable>
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Sort and Filter" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                marginVertical: 10,
                flex: 2,
                height: 280,
                borderRightWidth: 1,
                borderColor: "#e0e0e0",
              }}
            >
              <Text style={{ textAlign: "center" }}>Sort</Text>
            </View>
            <View style={{ flex: 3, margin: 10 }}>
              {filters.map((item, index) => (
                <Pressable
                  onPress={() => setSelectedFilter(item.filter)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                  key={index}
                >
                  {selectFilter.includes(item.filter) ? (
                    <FontAwesome name="circle" size={18} color="green" />
                  ) : (
                    <Entypo name="circle" size={18} color="black" />
                  )}
                  <Text
                    style={{ fontSize: 16, fontWeight: "500", marginLeft: 6 }}
                  >
                    {item.filter}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({});
