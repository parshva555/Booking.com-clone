import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

const ProfileScreen = () => {
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
    <View>
      <Text>Name: {fullName}</Text>
      <Text>Email: {email}</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})
