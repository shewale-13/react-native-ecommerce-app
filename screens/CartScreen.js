import { Platform, ScrollView, StyleSheet, Text, View, Pressable, TextInput, Image } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { decreamentQuantity, incrementQuantity, removeFromCart } from '../redux/CartReducer';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
    const cart = useSelector((state) => state.cart.cart)
    const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0)
    const dispatch = useDispatch()
    const increaseQuantity = (cartItem) => {
        dispatch(incrementQuantity(cartItem))
    }
    const decreaseQuantity = (cartItem) => {
        dispatch(decreamentQuantity(cartItem))
    }
    const deleteItem = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    }
    const navigation = useNavigation()
    return (
        <ScrollView style={{ flex: 1, marginTop: Platform.OS == 'android' ? 38 : 0, backgroundColor: 'white' }}>
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

            <View style={{ flexDirection: 'row', gap: 5, padding: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "400" }}>SubTotal :</Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>₹{total}</Text>
            </View>
            <Text style={{ marginHorizontal: 10 }}>EMI Options Available</Text>

            <Pressable style={{
                backgroundColor: '#FFC72C',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                margin: 15,
                borderRadius: 7
            }} onPress={() => navigation.navigate("Confirm")}>
                <Text>Proceed to buy ({cart?.length}) items</Text>
            </Pressable>

            <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

            <View style={{ marginHorizontal: 10 }}>
                {
                    cart?.map((item, index) => (
                        <View style={{
                            backgroundColor: "white",
                            marginVertical: 10,
                            borderBottomColor: "#F0F0F0",
                            borderWidth: 2,
                            borderLeftWidth: 0,
                            borderRightWidth: 0,
                            borderTopWidth: 0
                        }} key={index}>
                            <Pressable style={{ flexDirection: 'row', marginVertical: 10, justifyContent: "space-between" }}>
                                <View>
                                    <Image style={{ width: 140, height: 140, resizeMode: 'contain' }} source={{ uri: item?.image }} />
                                </View>
                                <View style={{ marginLeft: 5 }}>
                                    <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>{item?.title}</Text>
                                    <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 5 }}>₹{item?.price}</Text>
                                    <Image
                                        style={{ width: 30, height: 30, resizeMode: "contain" }}
                                        source={{
                                            uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                                        }}
                                    />
                                    <Text style={{ color: "green" }}>In Stock</Text>
                                </View>
                            </Pressable>

                            <Pressable style={{ marginTop: 15, marginBottom: 5, flexDirection: "row", alignItems: 'center', gap: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7 }}>
                                    {
                                        item?.quantity > 1 ? (
                                            <Pressable style={{ backgroundColor: "#F0F0F0", padding: 7, borderTopLeftRadius: 6, borderBottomRightRadius: 6 }} onPress={() => decreaseQuantity(item)}>
                                                <AntDesign name="minus" size={24} color="black" />
                                            </Pressable>
                                        ) : (
                                            <Pressable style={{ backgroundColor: "#F0F0F0", padding: 7, borderTopLeftRadius: 6, borderBottomRightRadius: 6 }} onPress={() => deleteItem(item)}>
                                                <AntDesign name="delete" size={24} color="black" />
                                            </Pressable>
                                        )
                                    }
                                    <Pressable style={{ paddingHorizontal: 18, paddingVertical: 6, backgroundColor: "white" }}>
                                        <Text>{item?.quantity}</Text>
                                    </Pressable>
                                    <Pressable style={{ backgroundColor: "#F0F0F0", padding: 7, borderTopLeftRadius: 6, borderBottomRightRadius: 6 }} onPress={() => increaseQuantity(item)}>
                                        <Feather name="plus" size={24} color="black" />
                                    </Pressable>
                                </View>
                                <Pressable style={{ paddingHorizontal: 8, paddingVertical: 10, backgroundColor: "white", borderColor: "#C0C0C0", borderWidth: 0.6, borderRadius: 5 }} onPress={() => deleteItem(item)}>
                                    <Text>Delete</Text>
                                </Pressable>
                            </Pressable>

                            <Pressable style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginBottom: 15 }}>
                                <Pressable style={{ paddingHorizontal: 8, paddingVertical: 10, backgroundColor: "white", borderColor: "#C0C0C0", borderWidth: 0.6, borderRadius: 5 }}>
                                    <Text>Save For Later</Text>
                                </Pressable>
                                <Pressable style={{ paddingHorizontal: 8, paddingVertical: 10, backgroundColor: "white", borderColor: "#C0C0C0", borderWidth: 0.6, borderRadius: 5 }}>
                                    <Text>See More Product Like This</Text>
                                </Pressable>
                            </Pressable>
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    )
}

export default CartScreen

const styles = StyleSheet.create({})