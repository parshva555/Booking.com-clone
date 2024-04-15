import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'

const SearchResults = ({cities, input, setInput}) => {
  const navigation = useNavigation();
  return (
    <View style={{padding:10}}>
      <FlatList data={cities} renderItem={({item}) => {
        if(item.toLowerCase().includes(input.toLowerCase())){
            if(input ===""){
                return null;
            }
            return (
                <Pressable onPress={() => {
                    setInput(item);
                    navigation.navigate("Home",{
                        input:item
                    })
                }} style={{flexDirection:'row',alignItems:'center',marginVertical:10}}>
                    {/* <View>
                        <Image style={{width:70, height:70}} source={{uri:item.placeImage}}/>
                    </View> */}
                    <View style={{marginLeft:10}}>
                        <Text style={{fontSize:15, fontWeight:500}}>{item}</Text>
                        {/* <Text style={{marginVertical:4}}>{item.shortDescription}</Text>
                        <Text style={{color:'gray',fontSize:15}}>{item.properties.length} Properties</Text> */}
                    </View>
                </Pressable>
            )
        }
      }}/>
    </View>
  )
}

export default SearchResults

const styles = StyleSheet.create({})
