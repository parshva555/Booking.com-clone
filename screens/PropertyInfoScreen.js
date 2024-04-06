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
import React, { useLayoutEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { pixelNormalize } from "../components/Normalise";

const PropertyInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
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
      <ScrollView>
        <Pressable
          style={{ flexDirection: "row", flexWrap: "wrap", margin: 10 }}
        >
          {route.params.photos.slice(0, 5).map((photo) => (
            <View style={{ margin: 5 }}>
              <Image
                style={{
                  width: 120,
                  height: pixelNormalize(80),
                  borderRadius: pixelNormalize(4),
                }}
                source={{ uri: photo.image }}
              />
            </View>
          ))}
          <Pressable style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ textAlign: "center", marginLeft: 20 }}>
              Show More
            </Text>
          </Pressable>
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
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
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
              Tranvel Sustainable
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
        <Text style={{ marginTop: 10, fontSize: 17, fontWeight: 500,marginHorizontal:12 }}>
            Price for 1 Night and {route.params.adults} adults
          </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal:12,
            marginTop:4,
            gap: 8,
          }}
        >
          <Text
            style={{
              color: "red",
              fontSize: 20,
              textDecorationLine: "line-through",
            }}
          >
            {route.params.oldPrice * route.params.adults}
          </Text>
          <Text style={{ color: "black", fontSize: 20}}>
            Rs {route.params.newPrice * route.params.adults}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyInfoScreen;

const styles = StyleSheet.create({});
