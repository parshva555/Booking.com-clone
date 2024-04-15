import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native'
const PropertyCard = ({
  // rooms,
  children,
  hotel,
  adults,
  selectedDates,
  // availableRooms,
}) => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("Info",{
        name:hotel.name,
        id: hotel._id,
        rating:hotel.starRating,
        price:hotel.pricePerNight,
        photos:hotel.imageUrls,
        adults:adults,
        children:children,
        selectedDates:selectedDates
      })}
        style={{ flexDirection: "row", margin: 15, backgroundColor: "white" }}
      >
        <View>
          <Image
            style={{ height: height / 4, width: width - 280 }}
            source={{ uri: hotel.imageUrls[0] }}
          />
        </View>
        <View style={{ padding: 15 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ width: 180 }}>{hotel.name}</Text>
            <AntDesign name="hearto" size={24} color="red" />
          </View>
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
              <Text>{hotel.starRating}</Text>
              <View
                style={{
                  backgroundColor: "#6cb4ee",
                  paddingVertical: 3,
                  borderRadius: 5,
                  width: 100,
                }}
              >
                <Text
                  style={{ textAlign: "center", color: "white", fontSize: 15 }}
                >
                  Genius Level
                </Text>
              </View>
            </View>
          </View>
          <Text style={{ marginTop: 4, fontSize: 15, fontWeight: 500 }}>
            Price for 1 Night and {adults} adults
          </Text>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text style={{ color: "black", fontSize: 18 }}>
              Rs {hotel.pricePerNight * adults}
            </Text>
          </View>
          <View  style={{
                  backgroundColor: "#6082b6",
                  paddingVertical: 2,
                  borderRadius: 5,
                  marginTop:2,
                  width: 150,
                  paddingHorizontal:3
                }}>
            <Text style={{textAlign:'center',color:'white'}}>Limited Time Deal</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({});
