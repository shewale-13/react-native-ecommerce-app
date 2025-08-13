import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import OrderScreen from '../screens/OrderScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} 
                options={{
                    tabBarLabel: 'Home',
                    tabBarLabelStyle: {color:"#008E97"},
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        focused ? (
                            <Entypo name="home" size={24} color="#008E97" />
                        ) : (
                            <AntDesign name="home" size={24} color="black" />
                        )
                    )
                }}/>
                <Tab.Screen name="Profie" component={ProfileScreen} 
                options={{
                    tabBarLabel: 'Profile',
                    tabBarLabelStyle: {color:"#008E97"},
                    tabBarIcon: ({focused}) => (
                        focused ? (
                            <Ionicons name="person" size={24} color="#008E97" />
                        ) : (
                            <Ionicons name="person-outline" size={24} color="black" />
                        )
                    )
                }}/>
                <Tab.Screen name="Cart" component={CartScreen} 
                options={{
                    tabBarLabel: 'Cart',
                    tabBarLabelStyle: {color:"#008E97"},
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        focused ? (
                            <Entypo name="shopping-cart" size={24} color="#008E97" />
                        ) : (
                            <EvilIcons name="cart" size={26} color="black" />
                        )
                    )
                }}/>
        </Tab.Navigator>
    )
}

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Mains" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="ProductInfo" component={ProductInfoScreen} options={{ headerShown: false }} />
                <Stack.Screen name="AddAddress" component={AddAddressScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Add" component={AddressScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Confirm" component={ConfirmationScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }} />
            </Stack.Navigator>

        </NavigationContainer>

    )
}

export default StackNavigator

const styles = StyleSheet.create({})