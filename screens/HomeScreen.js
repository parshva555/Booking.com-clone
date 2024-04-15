import {
  Button,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from "react-native";
import { useState } from "react";
import React, { useLayoutEffect } from "react";
import { useNavigation,useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Feather } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";
import {
  BottomModal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [destination, setDestination] = useState('');
  const [selectedDates, setSelectedDates] = useState();
  const route = useRoute();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Booking.com",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginLeft: 115,
      },
      headerStyle: {
        backgroundColor: "#003580",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="white"
          style={{ marginRight: 12 }}
        />
      ),
    });
  }, []);

  const customButton = (onConfirm) => {
    return (
      <Button
        onPress={onConfirm}
        style={{
          container: { width: "80%", marginHorizontal: "3%" },
          text: { fontSize: 20 },
        }}
        primary
        title="Submit"
      />
    );
  };

  const searchPlaces = () => {
    if(!route?.params?.input || !selectedDates.startDate || !selectedDates.endDate){
      Alert.alert('Invalid Details', 'Please enter all the details', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    if(route.params.input && selectedDates){
      navigation.navigate("Places",{
        rooms:rooms,
        adults:adults,
        children:children,
        selectedDates:selectedDates,
        place: route.params.input,
      })
    }
  }
  return (
    <>
      <View>
        <Header />
        <ScrollView>
          <View
            style={{
              margin: 20,
              borderColor: "#FFC72C",
              borderWidth: 3,
              borderRadius: 6,
            }}
          >
            {/* Destination */}
            <Pressable
            onPress={()=>navigation.navigate("Search")}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="search" size={24} color="black" />
              <TextInput
                placeholder={route?.params ? route?.params?.input : "Enter your Destination"}
                placeholderTextColor="black"
              />
            </Pressable>

            {/* Selected Dates */}
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="calendar" size={24} color="black" />
              <DatePicker
                style={{
                  width: 250,
                  height: 30,
                  borderRadius: 0,
                  borderWidth: 0,
                  borderColor: "transparent",
                }}
                customStyles={{
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                  headerStyle: {
                    backgroundColor: "#0035ab",
                  },
                  contentText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                }}
                selectedBgColor="#0047AB"
                customButton={(onConfirm) => customButton(onConfirm)}
                onConfirm={(startDate, endDate) =>
                  setSelectedDates(startDate, endDate)
                }
                allowFontScaling={false}
                placeholder={"Select Your Dates"}
                mode={"range"}
              />
            </Pressable>

            {/* Rooms and Guests */}
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Ionicons name="person-outline" size={24} color="black" />
              <TextInput
                placeholderTextColor="red"
                placeholder={`${rooms} Room - ${adults} Adults - ${children} Children`}
              />
            </Pressable>

            {/* Search Button */}
            <Pressable
            onPress={() => {searchPlaces()}}
              style={{
                paddingHorizontal: 10,
                borderColor: "#FFC72C",
                borderWidth: 2,
                paddingVertical: 15,
                backgroundColor: "#2a52be",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "white",
                }}
              >
                Search
              </Text>
            </Pressable>
          </View>
          <Text style={{marginHorizontal:20,fontSize:17,fontWeight:500}}>
            Travel More and Spend Less
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable style={{width:200,height:150,marginTop:10,backgroundColor:'#003580', borderRadius:10,padding:20,marginHorizontal:20}}>
            <Text style={{color:'white',fontSize:15,fontWeight:"bold",marginVertical:7}}>Genius</Text>
            <Text style={{color:'white',fontSize:15,fontWeight:500}}>You are at Genius Level one in our Loyalty Program</Text>
          </Pressable>
          <Pressable style={{width:200,height:150,marginTop:10,borderColor:'#e0e0e0',borderWidth:2, borderRadius:10,padding:20,marginHorizontal:10}}>
            <Text style={{fontSize:15,fontWeight:"bold",marginVertical:7}}>15% Discounts</Text>
            <Text style={{fontSize:15,fontWeight:500}}>Complete 5 Stays to unlock level 2</Text>
          </Pressable>
          <Pressable style={{width:200,height:150,marginTop:10,borderColor:'#e0e0e0',borderWidth:2, borderRadius:10,padding:20,marginHorizontal:10}}>
            <Text style={{fontSize:15,fontWeight:"bold",marginVertical:7}}>10% Discounts</Text>
            <Text style={{fontSize:15,fontWeight:500}}>Enjoy Discounts at participating at properties Worldwide</Text>
          </Pressable>
          </ScrollView>
          <Pressable
          style={{marginTop:40,justifyContent:'center',alignItems:'center'}}>
            <Image style={{width:200,height:50,resizeMode:"cover"}} source={{
              uri:"https://assets.stickpng.com/thumbs/5a32a821cb9a85480a628f8f.png"
            }}/>
          </Pressable>
        </ScrollView>
      </View>

      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={{
                marginBottom: 20,
                color: "white",
                backgroundColor: "#003580",
              }}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select rooms and guests" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent
          style={{
            width: "100%",
            height: 310,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{fontSize:16,fontWeight:500}}>Rooms</Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 15,
              }}
            >
              <Pressable
              onPress={() => setRooms(Math.max(1,rooms-1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: 600,
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>
              <Pressable>
                <Text>{rooms}</Text>
              </Pressable>
              <Pressable
              onPress={() => setRooms((c) => c+1)}
              style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0e0",
                }}>
                <Text style={{
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: 500,
                    paddingHorizontal: 6,
                  }}>+</Text>
              </Pressable>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{fontSize:16,fontWeight:500}}>Adults</Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 15,
              }}
            >
              <Pressable
              onPress={() => setAdults(Math.max(1,adults-1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: 600,
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>
              <Pressable>
                <Text>{adults}</Text>
              </Pressable>
              <Pressable
              onPress={()=>setAdults((c) => c+1)}
              style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0e0",
                }}>
                <Text style={{
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: 500,
                    paddingHorizontal: 6,
                  }}>+</Text>
              </Pressable>
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{fontSize:16,fontWeight:500}}>Children</Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 15,
              }}
            >
              <Pressable
              onPress={() => setChildren(Math.max(0,children-1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: 600,
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>
              <Pressable>
                <Text>{children}</Text>
              </Pressable>
              <Pressable onPress={()=>setChildren((c) => c+1)}
               style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0e0",
                }}>
                <Text style={{
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: 500,
                    paddingHorizontal: 6,
                  }}>+</Text>
              </Pressable>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
