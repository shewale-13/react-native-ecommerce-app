import { ScrollView, StyleSheet, Text, View, Platform, Pressable, TextInput, Dimensions, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

const ProductInfoScreen = () => {
    const { width } = Dimensions.get('window');
    const height = (width * 100) / 100;
    const route = useRoute()
    const dispatch = useDispatch();
    const [addedToCart, setAddedToCart] = useState(false);
    const addItemToCart = (product) => {
        setAddedToCart(true);
        dispatch(addToCart(product))
        setTimeout(() => {
            setAddedToCart(false);
        }, 2000);
    }
    const cart = useSelector((state) => state.cart.cart);
    console.log("Cart items:", cart);
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white', marginTop: Platform.OS === 'android' ? 38 : 0 }}>
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
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                {
                    route.params?.carouselImages?.map((image, index) => (
                        <ImageBackground
                            key={index}
                            source={{ uri: image }}
                            style={{ width, height, marginTop: 20 }}
                            imageStyle={{ resizeMode: 'contain' }}
                        >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>

                                {/* LEFT SIDE: Column of 20% Off and Share Icon */}
                                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                    {/* 20% Off Badge */}
                                    <View style={{
                                        width: 60,
                                        height: 30,
                                        borderRadius: 15,
                                        backgroundColor: '#C60C30',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 10
                                    }}>
                                        <Text style={{
                                            color: 'white',
                                            textAlign: 'center',
                                            fontWeight: '600',
                                            fontSize: 12
                                        }}>20% Off</Text>
                                    </View>

                                    {/* Share Icon */}
                                    <View style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: '#E0E0E0',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '280'
                                    }}>
                                        <MaterialCommunityIcons name="share-variant" size={20} color="black" />
                                    </View>
                                </View>

                                {/* RIGHT SIDE: Heart Icon */}
                                <View style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 20,
                                    backgroundColor: '#E0E0E0',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <AntDesign name="hearto" size={20} color="black" />
                                </View>
                            </View>
                        </ImageBackground>
                    ))
                }
            </ScrollView>

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>{route.params?.title}</Text>
                <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 5 }}>₹{route.params?.price}</Text>
            </View>

            <Text style={{ borderWidth: 1, height: 1, color: "#D0D0D0" }} />

            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Text>Color: </Text>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>{route.params?.color}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Text>Size: </Text>
                <Text style={{ fontSize: 15, fontWeight: '500' }}>{route.params?.size}</Text>
            </View>

            <Text style={{ borderWidth: 1, height: 1, color: "#D0D0D0" }} />

            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 5 }}>Total: ₹{route.params?.price}</Text>
                <Text style={{ color: '#00CED1', fontSize: 16 }}>Free Delivery Tommorow by 3 PM. Order within 10hrs 29min</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, gap: 5 }}>
                    <Ionicons name="location" size={24} color="black" />
                    <Text style={{ fontSize: 15, fontWeight: '500' }}>Deliver To Tejas - Pune 411057</Text>
                </View>
            </View>
            <Text style={{ color: "green", marginHorizontal: 10, fontWeight: '500', fontSize: 18 }}>In Stock</Text>
            <Pressable
                onPress={() => addItemToCart(route?.params.item)}
                style={{
                    backgroundColor: "#FFC72C",
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                    marginHorizontal: 10
                }}>
                {
                    addedToCart ? <Text>Added to Cart</Text> : <Text>Add to Cart</Text>
                }
            </Pressable>
            <Pressable style={{
                backgroundColor: "#FFAC1C",
                padding: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                marginHorizontal: 10
            }}>
                <Text>Buy Now</Text>
            </Pressable>
        </ScrollView>
    )
}
export default ProductInfoScreen

const styles = StyleSheet.create({})