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
  function calculateDifferenceInDays(startDateString, endDateString) {
    // Convert date strings from `YYYY/MM/DD` format to `YYYY-MM-DD` format
    const formattedStartDateString = startDateString.replaceAll('/', '-');
    const formattedEndDateString = endDateString.replaceAll('/', '-');
  
    // Parse the date strings using the formatted format
    const startDate = new Date(formattedStartDateString);
    const endDate = new Date(formattedEndDateString);
  
    // Calculate the difference in time in milliseconds
    const differenceInTime = endDate - startDate;
  
    // Convert the difference from milliseconds to days
    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
  
    return differenceInDays;
  }
  const startDate = selectedDates.startDate;
  const endDate = selectedDates.endDate;
  const differenceInDays = calculateDifferenceInDays(startDate, endDate);
  // Log the calculated difference in days
  console.log('Difference in Days:', differenceInDays);

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
                  backgroundColor: "#FFD700",
                  paddingVertical: 3,
                  borderRadius: 5,
                  width: 60,

                }}
              >
                <Text
                  style={{ textAlign: "center", color: "black", fontSize: 15, }}
                >
                  Luxury
                </Text>
              </View>
            </View>
          </View>
          <Text style={{ marginTop: 4, fontSize: 15, fontWeight: 500,width:200 }}>
            Price for {differenceInDays} Night and {adults} adults and {adults/2} rooms
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
              Rs {hotel.pricePerNight * (adults/2) * differenceInDays}
            </Text>
          </View>
          <View  style={{
                  backgroundColor: "#54BAB9",
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
