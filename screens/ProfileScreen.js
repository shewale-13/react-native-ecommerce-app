import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useId, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation()
  const { userId, setUserId } = useContext(UserType)
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#00CED1"
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />
          <AntDesign name="search1" size={24} color="black" />
        </View>
      )
    })
  }, [])
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/profile/${userId}`)
        const { user } = response.data
        setUser(user)

      } catch (error) {
        console.log("Error in fetching profile user data", error)
      }
    }
    fetchUserData()
  }, [])
  console.log("user ", user)

  const logout = () => {
    clearAuthToken()
  }
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("userToken")
    console.log("Auth token cleared")
    navigation.replace("Login")
  }

  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:8000/orders/${userId}`)
        const orders = response.data.orders
        setOrders(orders)
        setLoading(false)
      } catch (error) {
        console.log("Error in fetching orders at profile screen ", error)
      }
    }
    fetchOrders()
  }, [])
  console.log("orders ", orders)
  return (
    <ScrollView style={{
      flex: 1,
      backgroundColor: 'white',
      padding: 10
    }}>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>Welcome, {user?.name}</Text>
      <View style={{
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        gap: 10
      }}>
        <Pressable style={{
          backgroundColor: "#E0E0E0",
          paddingHorizontal: 40,
          paddingVertical: 20,
          borderRadius: 25,
          flex: 1
        }}>
          <Text style={{ textAlign: 'center' }}>Your Orders</Text>
        </Pressable>
        <Pressable style={{
          backgroundColor: "#E0E0E0",
          paddingHorizontal: 40,
          paddingVertical: 20,
          borderRadius: 25,
          flex: 1
        }}>
          <Text style={{ textAlign: 'center' }}>Your Account</Text>
        </Pressable>
      </View>

      <View style={{
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        gap: 10
      }}>
        <Pressable style={{
          backgroundColor: "#E0E0E0",
          paddingHorizontal: 40,
          paddingVertical: 20,
          borderRadius: 25,
          flex: 1
        }}>
          <Text style={{ textAlign: 'center' }}>Buy Again</Text>
        </Pressable>
        <Pressable style={{
          backgroundColor: "#E0E0E0",
          paddingHorizontal: 40,
          paddingVertical: 20,
          borderRadius: 25,
          flex: 1
        }} onPress={logout}>
          <Text style={{ textAlign: 'center' }}>Logout</Text>
        </Pressable>
      </View>

      <Text style={{ height: 1, borderWidth: 1, color: "#C0C0C0", marginVertical: 15 }} />

      <View style={{
        marginHorizontal:5
      }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Latest Products you buyed</Text>
        {
          orders.map((order) => (
            <View style={{
              flexDirection:'row',
              gap:15,
              flexWrap:'wrap',
              paddingHorizontal:10,
              paddingVertical:10,
              alignItems:'center'
            }}>
              {
                order.products?.map((item, index) => (
                  <Pressable key={index} style={{borderWidth:1, borderColor:'#C0C0C0', padding:10}}>
                    <Image source={{ uri: item?.image }} style={{ width: 150, height: 150, resizeMode: "contain" }} />
                  </Pressable>
                ))
              }
            </View>
          ))}
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})