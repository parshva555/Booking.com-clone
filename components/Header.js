import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={{backgroundColor:'#003580', height:65, flexDirection:'row',alignItems:'center', justifyContent:'space-around'}}>
      <Pressable style={{   flexDirection:'row',alignItems:'center', borderColor:'white',borderWidth:1,borderRadius:25,padding:8}}>
      <Ionicons name="bed-outline" size={23} color="white" />
      <Text style={{marginLeft:8, fontWeight:"bold",color:'white',fontSize:15}}>Stays</Text>
      </Pressable>

    </View>
  )
}

export default Header

const styles = StyleSheet.create({})