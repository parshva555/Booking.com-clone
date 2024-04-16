import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigation = useNavigation();

  const login = async () => {
    if (email === "" || password === "") {
      Alert.alert(
        "Invalid Details",
        "Please enter all the credentials",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      try {
        const formData = {
          email: email, 
          password: password,
        };

        const response = await axios.post(
          "https://booking-backend-1-pmsm.onrender.com/api/auth/login",
          formData
        );
        console.log("Login successful:", response.data);
        return navigation.navigate("Main");
      } catch (error) {
        console.error("Login failed:", error);
        Alert.alert(
          "Login Failed",
          `An error occurred while logging in: ${error.message}`,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
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
          <Text style={{ color: "#009688", fontSize: 17, fontWeight: 700 }}>
            Sign In
          </Text>
          <Text style={{ marginTop: 15, fontSize: 18, fontWeight: 500 }}>
            Sign In into your account
          </Text>
        </View>

        {/* Input fields for email and password */}
        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 600, color: "gray" }}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail} // Use the setEmail function directly
              placeholder="Enter your email id"
              placeholderTextColor="black"
              style={{
                fontSize: 17,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
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
              onChangeText={setPassword} // Use the setPassword function directly
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="black"
              style={{
                fontSize: 17,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>
        </View>

        {/* Login button */}
        <Pressable
          onPress={login}
          style={{
            width: 200,
            backgroundColor: "#009688",
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

        {/* Navigation to registration screen */}
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 20 }}
        >
          <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>
            Don't have an account? Sign Up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
