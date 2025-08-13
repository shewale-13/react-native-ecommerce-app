import { ScrollView, StyleSheet, Text, View, Pressable, TextInput, Platform } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';
import axios from 'axios';

const AddAddressScreen = () => {
  const navigation = useNavigation()
  const { userId, setUserId } = useContext(UserType)
  const [address, setAddress] = useState([])
  useEffect(() => {
    fetchAddresses()
  }, [])
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/addresses/${userId}`)
      const { address } = response.data
      setAddress(address)
    } catch (err) {
      console.log("Error ", err)
    }
  }
  useFocusEffect(
    useCallback(() => {
      fetchAddresses()
    },[])
  )
  return (
    <ScrollView style={{ flex: 1, marginTop: Platform.OS === 'android' ? 38 : 0, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00CED1',
        padding: 10,

      }}>
        <Pressable style={
          {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            marginHorizontal: 7,
            borderRadius: 5,
            gap: 10,
            height: 38,
            flex: 1,
          }
        }>
          <AntDesign name="search1" size={22} color="black" style={{ paddingLeft: 10 }} />
          <TextInput placeholder='Search Amazon.in' />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Addresses</Text>
        <Pressable
          onPress={() => navigation.navigate("Add")}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            padding: 10,
            borderLeftWidth: 0,
            borderRightWidth: 0,
          }}>
          <Text>Add a new address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>
        <Pressable>
          {
            address?.map((item, index) => (
              <Pressable style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: 'column',
                gap: 5,
                marginVertical: 10
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.fullName}</Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>
                <Text style={{ fontSize: 14, color: "#181818" }}>{item?.flatHouse}, {item?.landmark}</Text>
                <Text style={{ fontSize: 14, color: "#181818" }}>{item?.areaStreet}</Text>
                <Text style={{ fontSize: 14, color: "#181818" }}>Maharashtra, India</Text>
                <Text style={{ fontSize: 14, color: "#181818" }}>Phone no.: {item?.mobileNumber}</Text>
                <Text style={{ fontSize: 14, color: "#181818" }}>Pincode: {item?.pincode}</Text>
                <View style={{
                  flexDirection: 'row',
                  marginTop: 7,
                  alignItems: 'center',
                  gap: 10
                }}>
                  <Pressable style={{
                    backgroundColor: '#F5F5F5',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0"
                  }}>
                    <Text>Edit</Text>
                  </Pressable>
                  <Pressable style={{
                    backgroundColor: '#F5F5F5',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0"
                  }}>
                    <Text>Delete</Text>
                  </Pressable>
                  <Pressable style={{
                    backgroundColor: '#F5F5F5',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0"
                  }}>
                    <Text>Set as default</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))
          }
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default AddAddressScreen;

const styles = StyleSheet.create({})