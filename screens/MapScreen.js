import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { useRoute } from "@react-navigation/native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
const MapScreen = () => {
  const route = useRoute();
  const mapView = useRef(null);
  console.log(route.params);
  return (
    <View>
      <MapView
        ref={mapView}
        style={{ width: "100%", height: "100%" }}
      >
        {route.params.searchResults.map((item) =>
          item.properties.map((property) => (
            <Marker
              title={property.name}
              coordinate={{
                latitude: Number(property.latitude),
                longitude: Number(property.longitude),
              }}
            ></Marker>
          ))
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
