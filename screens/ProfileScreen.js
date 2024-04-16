import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useLayoutEffect } from 'react';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [editingFullName, setEditingFullName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Profile",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginLeft:150
      },
      headerStyle: {
        backgroundColor: "#BB6464",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  });
  // Function to fetch user details from the server
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`https://booking-backend-1-pmsm.onrender.com/api/users/user-details`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Error fetching user details");
      }

      const data = await response.json();

      setFullName(`${data.firstName} ${data.lastName}`);
      setEmail(data.email);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  const updateUserDetails = async () => {
    try {
      const response = await fetch(`https://booking-backend-1-pmsm.onrender.com/api/users/update-details`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: newFullName.split(' ')[0],
          lastName: newFullName.split(' ')[1],
          email: newEmail,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Error updating user details");
      }
      fetchUserDetails();
      Alert.alert('Success', 'User details updated successfully');
    } catch (error) {
      console.error("Error updating user details:", error);
      Alert.alert('Error', 'Failed to update user details. Please try again.');
    }
  };
  useEffect(() => {
    fetchUserDetails();

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.itemContainer} onPress={() => setEditingFullName(true)}>
        <Ionicons name="person-circle" size={24} color="white" style={styles.icon} />
        {editingFullName ? (
          <TextInput
            style={styles.textInput}
            value={newFullName}
            onChangeText={setNewFullName}
            placeholder="Full Name"
            autoFocus={true}
            onBlur={() => setEditingFullName(false)}
          />
        ) : (
          <Text style={styles.itemText}>Full Name: {fullName}</Text>
        )}
      </Pressable>
      <Pressable style={styles.itemContainer} onPress={() => setEditingEmail(true)}>
        <Fontisto name="email" size={20} color="white" style={styles.icon} />
        {editingEmail ? (
          <TextInput
            style={styles.textInput}
            value={newEmail}
            onChangeText={setNewEmail}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus={true}
            onBlur={() => setEditingEmail(false)}
          />
        ) : (
          <Text style={styles.itemText}>Email: {email}</Text>
        )}
      </Pressable>
      <Pressable style={styles.updateButton} onPress={updateUserDetails}>
        <Text style={styles.buttonText}>Update Details</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:200,
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#BB6464',
    marginVertical: 10,
    marginHorizontal: 4,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 370,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
  },
  updateButton: {
    marginLeft:90,
    width:200,
    backgroundColor: '#009688',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ProfileScreen;
