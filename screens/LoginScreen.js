import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput } from 'react-native'
import React from 'react'

const LoginScreen = () => {
  return (
    <SafeAreaView style={{flex:1,backfaceVisibility:"white",padding:10,alignItems:'center'}}>
        <KeyboardAvoidingView>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:100}}>
                <Text style={{color:"#003580",fontSize:17,fontWeight:700}}>
                    Sign In
                </Text>
                <Text style={{marginTop:15,fontSize:18,fontWeight:500}}>
                    Sign In into your account
                </Text>
            </View>
            <View style={{marginTop:50}}>
                <View>
                    <Text style={{fontSize:17,fontWeight:500}}>Email</Text>
                    <TextInput
                    placeholder='Enter your email id'
                    placeholderTextColor="black"
                    style={{
                        borderBottomColor:"gray",
                        borderBottomWidth:8,
                        marginVertical:10,
                        width:300
                    }}/>
                </View>
                <View style={{marginTop:25}}>
                    <Text style={{fontSize:17,fontWeight:500}}>Password</Text>
                    <TextInput
                    secureTextEntry={true}
                    placeholder='Password'
                    placeholderTextColor="black"
                    style={{
                        borderBottomColor:"gray",
                        borderBottomWidth:8,
                        marginVertical:10,
                        width:300
                    }}/>
                </View>
            </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})