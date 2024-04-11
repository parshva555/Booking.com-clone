import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const navigation = useNavigation();
  // const register = async () => {
  //   if (
  //     email === "" ||
  //     password === "" ||
  //     firstName === "" ||
  //     lastName === ""
  //   ) {
  //     Alert.alert(
  //       "Invalid Details",
  //       "Please enter all the credentials",
  //       [
  //         {
  //           text: "OK",
  //           onPress: () => console.log("OK Pressed"),
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //     try {
  //       const formData = {
  //         firstName: firstName,
  //         lastName: lastName,
  //         password: password,
  //         email: email,
  //       };
  //       const response = await axios.post(
  //         "http://192.168.1.9:7000/api/users/register",
  //         formData,
  //         {
  //           headers: {
  //             "content-type": "application/json",
  //           },
  //         }
  //       );
  //       console.log(response.data); // Assuming the response contains a message property
  //       return response.data.message;
  //     } catch (error) {
  //       console.error("Axios error:", error); // Log the full error object
  //       Alert.alert(
  //         "Registration Failed",
  //         `An error occurred while registering: ${error.message}`, // Display a user-friendly error message
  //         [
  //           {
  //             text: "OK",
  //             onPress: () => console.log("OK Pressed"),
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //     }
  //     return; // Exit the function early if any field is empty
  //   }
  // };
  const register = async () => {
    // if (
    //   email === "" ||
    //   password === "" ||
    //   firstName === "" ||
    //   lastName === ""
    // ) {
    //   Alert.alert(
    //     "Invalid Details",
    //     "Please enter all the credentials",
    //     [
    //       {
    //         text: "OK",
    //         onPress: () => console.log("OK Pressed"),
    //       },
    //     ],
    //     { cancelable: false }
    //   );
    //   return;
    // }

    // try {
    //   const formData = {
    //     firstName: firstName,
    //     lastName: lastName,
    //     email: email,
    //     password: password
    //   };

    //   const response = await axios.post(
    //     "http://192.168.1.9:7000/api/users/register",
    //     formData,
    //     {
    //       headers: {
    //         "content-type": "application/json",
    //       },
    //     }
    //   );

    //   console.log(response.data); // Assuming the response contains a message property
    //   return response.data.message;
    // } catch (error) {
    //   console.error("Axios error:", error); // Log the full error object
    //   Alert.alert(
    //     "Registration Failed",
    //     `An error occurred while registering: ${error.message}`, // Display a user-friendly error message
    //     [
    //       {
    //         text: "OK",
    //         onPress: () => console.log("OK Pressed"),
    //       },
    //     ],
    //     { cancelable: false }
    //   );
    // }
    console.log("Hello")
    const user = {
      firstName: firstName,
      lastName:lastName,
      email: email,
      password: password,
      // profileImage: image
    }

    axios.post("http://192.168.56.1:7000/api/users/register",user).then((response)=>{
      console.log(response);
      Alert.alert("Registeration Successful","You have been registered successfully");
      setFirstName("");
      setlastName("");
      setEmail("");
      setPassword("");
      // setImage("");
    }).catch((error) => {
      Alert.alert("Registeration failed","An error occurred while registering");
      console.log("Registeration failed",error);
    })
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
          <Text style={{ color: "#003580", fontSize: 17, fontWeight: "700" }}>
            Register
          </Text>

          <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
            Create an Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              First Name
            </Text>

            <TextInput
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              placeholder="Enter your First Name"
              placeholderTextColor={"black"}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Last Name
            </Text>

            <TextInput
              value={lastName}
              onChangeText={(text) => setlastName(text)}
              placeholder="Enter your Last Name"
              placeholderTextColor={"black"}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>

            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Enter your email id"
              placeholderTextColor={"black"}
              style={{
                fontSize: email ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Password
            </Text>

            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor={"black"}
              style={{
                fontSize: password ? 18 : 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
            />
          </View>
        </View>

        <Pressable
          onPress={register}
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
              textAlign: "center",
              color: "white",
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginTop: 20 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 17 }}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
