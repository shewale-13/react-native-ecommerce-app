import { StyleSheet, Text, View, Pressable, TextInput, SafeAreaView, KeyboardAvoidingView, Image, Alert } from 'react-native'
import React, {useState} from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password
    }
    // send post request to backend api
    axios.post('http://10.0.2.2:8000/register', user).then((response) => {
      console.log(response)
      Alert.alert("Registration Successful", "You have registered successfully")
      setEmail("");
      setPassword("");
      setName("");
      navigation.navigate('LoginScreen');
    }).catch((error) => {
      console.log(error);
      Alert.alert("Registration Failed", "Please try again later")
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
                Register to your Account</Text>
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
                <Ionicons name="person" size={24} color="grey" style={{marginLeft:8}}/>
                <TextInput placeholder='Enter your Name' style={{ color: 'grey', marginVertical: 5, width: 300, fontSize: name ? 16 : 16 }}
                  value={name} onChangeText={(text) => setName(text)} />
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
            }} onPress={() => handleRegister()}>
              <Text style={{
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
                color: 'white'
              }}>Register</Text>
            </Pressable>
            <Pressable style={{marginTop:15}} onPress={() => navigation.goBack()}>
              <Text style={{fontSize:16, color:'grey', textAlign:'center'}}>Already have an Account? Login</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})