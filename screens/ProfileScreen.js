import { StyleSheet, Text, View , Pressable} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const ProfileScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Profile",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginHorizontal:150
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);
  const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");

  const fetchUserDetails = async () => {
    const response = await fetch(`https://booking-backend-1-pmsm.onrender.com/api/users/user-details`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error fetching user details");
    }

    const data = await response.json();

    const constructedFullName = `${data.firstName} ${data.lastName}`;
		setFullName(constructedFullName);
    setEmail(data.email);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.itemContainer}>
        <Ionicons name="person-circle" size={24} color="white" style={styles.icon} />
        <Text style={styles.itemText}>Full Name: {fullName}</Text>
      </Pressable>
      <Pressable style={styles.itemContainer}>
        <Fontisto name="email"  size={20} color="white" style={styles.icon} />
        <Text style={styles.itemText}>Email: {email}</Text>
      </Pressable>
    </SafeAreaView>
  );
  
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0039a6',
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
    width:370,
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
});
