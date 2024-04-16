import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SearchResults = ({ cities, input, setInput }) => {
  const navigation = useNavigation();
  return (
    <View style={{ padding: 10 }}>
      <FlatList data={cities} renderItem={({ item }) => {
        if (item.toLowerCase().startsWith(input.toLowerCase())) {
          if (input === "") {
            return null;
          }
          return (
            <Pressable onPress={() => {
              setInput(item);
              navigation.navigate("Home", {
                input: item
              })
            }} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: 500 }}>{item}</Text>
              </View>
            </Pressable>
          )
        }
      }} />
    </View>
  )
}

export default SearchResults

const styles = StyleSheet.create({})
