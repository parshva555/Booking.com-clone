import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import SearchResults from "../components/SearchResults";
import axios from "axios";

const SearchScreen = () => {
  const [input,setInput] = useState("")
  const [cities, setCities] = useState([]);

  useEffect(() => {

    async function fetchCities() {
      const result = await axios.get("https://booking-backend-1-pmsm.onrender.com/api/hotels/get-cities");
      setCities(result.data.cities);
    }

    fetchCities();
  }, [])


  return (
    <SafeAreaView style={{ marginTop: 50 }}>
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderColor: "#ffc72c",
          borderWidth: 4,
          borderRadius: 10,
        }}
      >
        <TextInput value={input} onChangeText={(text) => setInput(text)} placeholder="Enter Your Destination" />
        <Feather name="search" size={22} color="black" />
      </View>
      <SearchResults cities={cities} input={input} setInput={setInput}/>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
