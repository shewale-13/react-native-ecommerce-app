import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState, } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try{
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
        navigation.replace('Mains'); 
        }
      }catch (error) {
        console.error("Error checking login status:", error);
      }
    };
    checkLoginStatus();
  }, [])

  const handleLogin = () => {
    const user = {
      email: email,
      password: password
    }
    axios.post('http://10.0.2.2:8000/login', user).then((response) => {
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem('userToken', token);
      navigation.replace('Mains');
      // setEmail("");
      // setPassword("");
    }).catch((error) => {
        Alert.alert("Login Failed", "Please check your credentials and try again");
        console.log(error);
    })
  }
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <View style={{marginTop:50}}>
        <Image style={{ width: 150, height: 100 }}
          source={require('../assets/amazon.png')} />
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 12, color: '#041E42' }}>
            Log In to your Account</Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View style={
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginTop: 30,
              borderRadius: 10,
              paddingVertical: 5,
              backgroundColor: '#D0D0D0',
            }}>
            <MaterialIcons name="email" size={24} color="grey" style={{ marginLeft: 8 }} />
            <TextInput placeholder='Enter your E-mail' style={{ color: 'grey', marginVertical: 5, width: 300, fontSize: email ? 16 : 16 }}
              value={email} onChangeText={(text) => setEmail(text)} />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              marginTop: 30,
              borderRadius: 10,
              paddingVertical: 5,
              backgroundColor: '#D0D0D0',
            }}>
            <AntDesign name="lock1" size={24} color="grey" style={{ marginLeft: 8 }} />
            <TextInput placeholder='Enter your Password' style={{ color: 'grey', marginVertical: 5, width: 300, fontSize: password ? 16 : 16 }}
              value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
          </View>
        </View>
        <View style={{ marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text>Keep me Logged in</Text>
          <Text style={{ color: '#007FFF', fontWeight: '500' }}>Forgot Password?</Text>
        </View>
        <View style={{ marginTop: 80 }} />
        <Pressable style={{
          width:200,
          backgroundColor:'#FEBE10',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: 15,
          borderRadius: 10,
        }} onPress={() => handleLogin()}>
          <Text style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
            color: 'white'
          }}>Login</Text>
        </Pressable>
        <Pressable style={{marginTop:15}} onPress={() => navigation.navigate('Register')}>
          <Text style={{fontSize:16, color:'grey', textAlign:'center'}}>Don't have an Account? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})