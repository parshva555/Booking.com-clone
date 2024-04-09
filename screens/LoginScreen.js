import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert
} from "react-native";
import {useNavigation} from '@react-navigation/native'
import React, { useState } from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const login = () => {
    if(email === "" || password === ""  ){
        Alert.alert(
            "Invalid Detials",
            "Please enter all the credentials",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
          );
    }
    if(email && password ){
        console.log("Main")
        return navigation.navigate("Main")
    }
}
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backfaceVisibility: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ color: "#003580", fontSize: 17, fontWeight: 700 }}>
            Sign In
          </Text>
          <Text style={{ marginTop: 15, fontSize: 18, fontWeight: 500 }}>
            Sign In into your account
          </Text>
        </View>
        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 600, color: "gray" }}>
              Email
            </Text>
            <TextInput
              value={email}
              onChange={(text) => setEmail(text)}
              placeholder="Enter your email id"
              placeholderTextColor="black"
              style={{
                fontSize: email ? 17 : 17,
                borderBottomColor: "gray",
                borderBottomWidth: 8,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>
          <View style={{ marginTop: 25 }}>
            <Text style={{ fontSize: 18, fontWeight: 600, color: "gray" }}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="black"
              style={{
                fontSize: password ? 17 : 17,
                borderBottomColor: "gray",
                borderBottomWidth: 8,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>
        </View>
        <Pressable
        onPress={login}
          style={{
            width: 200,
            backgroundColor: "#003580",
            padding: 15,
            borderRadius: 7,
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Register")} style={{marginTop:20}}>
            <Text style={{textAlign:'center',fontSize:16,color:'gray'}}>Dont have an account? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
