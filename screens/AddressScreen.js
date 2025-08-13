import { ScrollView, StyleSheet, Text, View, Platform, TextInput, Pressable, Alert } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import { UserType } from '../UserContext'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

const AddressScreen = () => {
    const navigation = useNavigation()
    const [fullName, setFullName] = useState("")  
    const [mobileNumber, setMobileNumber] = useState("")
    const [flatHouse, setFlatHouse] = useState("")
    const [areaStreet, setAreaStreet] = useState("")
    const [landmark, setLandmark] = useState("")
    const [pincode, setPincode] = useState("")
    const {userId, setUserId} = useContext(UserType)
    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.getItem('userToken')
            const decodedToken = jwtDecode(token)
            const userId = decodedToken.userId
            setUserId(userId)
        } 
        fetchUser()
    },[])
    const addUserAddress = () => {
        const address = {
            fullName,
            mobileNumber,
            flatHouse,
            areaStreet,
            landmark,
            pincode
        }
        axios.post("http://10.0.2.2:8000/addresses", {userId,address}).then((response) => {
            Alert.alert("Success","Address added Successfully")
            setAreaStreet("")
            setFlatHouse("")
            setFullName("")
            setLandmark("")
            setMobileNumber("")
            setPincode("")
            setTimeout(() => {
                navigation.goBack()
            },1000)
        }).catch((err) => {
            Alert.alert("Error", "Fail to add address")
            console.log(err)
        })
    }
  return (
    <ScrollView style={{ flex: 1, marginTop: Platform.OS === 'android' ? 38 : 0, backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
        <View style={{height:50, backgroundColor:"#00CED1"}}/>

        <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Add a new Address</Text>
            <TextInput placeholder='India' placeholderTextColor={"black"} style={{padding:10, borderColor:"#D0D0D0", borderWidth:1, borderRadius:5, marginTop:10}}/>
            <View style={{marginTop:10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold"}}>Full Name (First ad Last Name)</Text>
                <TextInput  value={fullName} onChangeText={(text)=> setFullName(text)} placeholder='Enter your Name' placeholderTextColor={"black"} style={{padding:10, borderColor:"#D0D0D0", borderWidth:1, borderRadius:5, marginTop:10}}/>
            </View>
            <View style={{marginTop:10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold"}}>Mobile Number</Text>
                <TextInput value={mobileNumber} onChangeText={(text)=>setMobileNumber(text)} placeholder='Enter your phone no.' placeholderTextColor={"black"} style={{padding:10, borderColor:"#D0D0D0", borderWidth:1, borderRadius:5, marginTop:10}}/>
            </View>
            <View style={{marginTop:10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold"}}>Flat, House No., Building, Company </Text>
                <TextInput value={flatHouse} onChangeText={(text)=> setFlatHouse(text)} placeholderTextColor={"black"} style={{padding:10, borderColor:"#D0D0D0", borderWidth:1, borderRadius:5, marginTop:10}}/>
            </View>
             <View style={{marginTop:10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold"}}>Area, Street, Sector, Village</Text>
                <TextInput value={areaStreet} onChangeText={(text)=> setAreaStreet(text)} placeholderTextColor={"black"} style={{padding:10, borderColor:"#D0D0D0", borderWidth:1, borderRadius:5, marginTop:10}}/>
            </View>
             <View style={{marginTop:10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold"}}>Land Mark</Text>
                <TextInput value={landmark} onChangeText={(text)=> setLandmark(text)} placeholder='Eg. Near Police Station' placeholderTextColor={"black"} style={{padding:10, borderColor:"#D0D0D0", borderWidth:1, borderRadius:5, marginTop:10}}/>
            </View>
             <View style={{marginTop:10 }}>
                <Text style={{ fontSize: 15, fontWeight: "bold"}}>Pincode</Text>
                <TextInput value={pincode} onChangeText={(text)=> setPincode(text)} placeholder='Eg. 411057' placeholderTextColor={"black"} style={{padding:10, borderColor:"#D0D0D0", borderWidth:1, borderRadius:5, marginTop:10}}/>
            </View>
            <Pressable style={{
                backgroundColor: "#FFC72C",
                padding: 15,
                borderRadius: 5,
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
            }} onPress={addUserAddress}>
                <Text style={{fontWeight:'bold'}}>Add Address</Text>
            </Pressable>
        </View>
    </ScrollView>
  )
}

export default AddressScreen

const styles = StyleSheet.create({})