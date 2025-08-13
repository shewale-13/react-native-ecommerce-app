import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../UserContext'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { clearCart } from '../redux/CartReducer';
import RazorpayCheckout from 'react-native-razorpay';

const ConfirmationScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const steps = [
        { title: "Address", content: "Address Form" },
        { title: "Delivery", content: "Delivery Option" },
        { title: "Payment", content: "Payment Details" },
        { title: "PlaceOrder", content: "Order Summary" },
    ]
    const cart = useSelector((state) => state.cart.cart)
    const total = cart?.map((item) => item.price * item.quantity).reduce((curr, prev) => curr + prev, 0)
    const [currStep, setCurrStep] = useState(0)
    const { userId, setUserId } = useContext(UserType)
    const [address, setAddress] = useState([])
    const [deliveryOption, setDeliverOption] = useState(false)
    const [paymentOption, setPaymentOption] = useState("")
    useEffect(() => {
        fetchAddresses()
    }, [])
    console.log(userId)
    const fetchAddresses = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:8000/addresses/${userId}`)
            const { address } = response.data
            setAddress(address)
        } catch (err) {
            console.log("Error ", err)
        }
    }
    const [selectedaddress, setSelectedAddress] = useState([])

    const pay = async () => {
        try {
            const options = {
                description: "Adding to wallet",
                currency: "INR",
                name: "Amazon",
                key: "rzp_test_a72cB5VuuxvbXG",
                amount: total * 100,
                prefill: {
                    email: "void@razorpay.com",
                    contact: "9191919191",
                    name: "Razorpay Software",
                },
                theme: { color: "#F37254" }
            }
            const data = await RazorpayCheckout.open(options)
            console.log(data)
            const orderData = {
                userId: userId,
                cartItems: cart,
                shippingAddress: {
                    name: selectedaddress.fullName,
                    houseNo: selectedaddress.flatHouse,
                    street: selectedaddress.areaStreet,
                    phone: selectedaddress.mobileNumber,
                    landmark: selectedaddress.landmark,
                    pincode: selectedaddress.pincode
                },
                paymentMethod: "card",
                totalPrice: total
            }
            const response = await axios.post("http://10.0.2.2:8000/orders", orderData)
            if (response.status === 200) {
                navigation.navigate("Order")
                dispatch(clearCart())
                console.log("Order created successfullyy", response.data.order)
            } else {
                console.log("Error creating order", response.data)
            }
        } catch (err) {
            console.log("Payment error: ", err)
        }
    }

    const handleOrder = async () => {
        try {
            const orderData = {
                userId: userId,
                cartItems: cart,
                shippingAddress: {
                    name: selectedaddress.fullName,
                    houseNo: selectedaddress.flatHouse,
                    street: selectedaddress.areaStreet,
                    phone: selectedaddress.mobileNumber,
                    landmark: selectedaddress.landmark,
                    pincode: selectedaddress.pincode
                },
                paymentMethod: paymentOption,
                totalPrice: total
            }
            const response = await axios.post("http://10.0.2.2:8000/orders", orderData)
            if (response.status === 200) {
                navigation.navigate("Order")
                dispatch(clearCart())
                console.log("Order created successfullyy", response.data.order)
            } else {
                console.log("Error creating order", response.data)
            }
        } catch (error) {
            console.log("Error handle order:", error)
        }
    }

    return (
        <ScrollView style={{ marginTop: Platform.OS == 'android' ? 38 : 0 }}>
            <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    {
                        steps?.map((steps, index) => (
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    index > 0 && (
                                        <View style={[{ flex: 1, height: 2, backgroundColor: "green" }, index <= currStep && { backgroundColor: "green" }]} />
                                    )
                                }
                                <View style={[{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: "#ccc",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 15
                                },
                                index < currStep && { backgroundColor: 'green' }
                                ]}>
                                    {
                                        index < currStep ? (
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>&#10003;</Text>
                                        ) : (
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>{index + 1}</Text>
                                        )
                                    }
                                </View>
                                <Text style={{ textAlign: 'center', marginTop: 10 }}>{steps.title}</Text>
                            </View>
                        ))
                    }
                </View>
            </View>
            {
                currStep == 0 && (
                    <View style={{ marginHorizontal: 20, alignItems: "center" }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Select Delivery Address</Text>
                        <Pressable>
                            {
                                address?.map((item, index) => (
                                    <Pressable style={{
                                        borderWidth: 1,
                                        borderColor: "#D0D0D0",
                                        padding: 10,
                                        flexDirection: 'row',
                                        gap: 10,
                                        alignItems: 'center',
                                        marginVertical: 10,
                                        paddingBottom: 17,
                                        borderRadius: 10
                                    }}>
                                        {
                                            selectedaddress && selectedaddress._id == item?._id ? (
                                                <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                                            ) : (
                                                <Entypo name="circle" size={20} color="grey" onPress={() => setSelectedAddress(item)} />
                                            )
                                        }
                                        <View style={{ justifyContent: 'center' }}>
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
                                            <View>
                                                {
                                                    selectedaddress && selectedaddress._id == item?._id && (
                                                        <Pressable style={{
                                                            backgroundColor: "#008397",
                                                            padding: 15,
                                                            borderRadius: 25,
                                                            marginTop: 15,
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }} onPress={() => setCurrStep(1)}>
                                                            <Text style={{ color: 'white', textAlign: 'center' }}>Deliver to this address</Text>
                                                        </Pressable>
                                                    )
                                                }
                                            </View>
                                        </View>
                                    </Pressable>
                                ))
                            }
                        </Pressable>
                    </View>
                )
            }
            {
                currStep == 1 && (
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Select your delivery option</Text>
                        <View style={{
                            borderWidth: 1,
                            borderColor: "#D0D0D0",
                            flexDirection: 'row',
                            gap: 7,
                            padding: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 15,
                            backgroundColor: 'white'
                        }}>
                            {
                                deliveryOption ? (
                                    <FontAwesome5 name="dot-circle" size={20} color="#008397" onPress={() => setDeliverOption(!deliveryOption)} />
                                ) : (
                                    <Entypo name="circle" size={20} color="grey" onPress={() => setDeliverOption(!deliveryOption)} />
                                )
                            }
                            <Text style={{ flex: 1 }}>
                                <Text style={{ color: "green", fontWeight: '500' }}>Tommorow by 10pm</Text>{" "}
                                - FREE delivery with your Prime Membership
                            </Text>
                        </View>
                        <Pressable style={{
                            backgroundColor: "#FFC72C",
                            padding: 15,
                            borderRadius: 25,
                            margin: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} onPress={() => setCurrStep(2)}>
                            <Text style={{ fontWeight: "500" }}>Continue</Text>
                        </Pressable>
                    </View>
                )
            }
            {
                currStep == 2 && (
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Select your payment method</Text>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            borderColor: "#D0D0D0",
                            borderWidth: 2,
                            padding: 10,
                            margin: 10,
                            gap: 10,
                            alignItems: 'center'
                        }}>
                            {
                                paymentOption == 'cash' ? (
                                    <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                                ) : (
                                    <Entypo name="circle" size={20} color="grey" onPress={() => setPaymentOption("cash")} />
                                )
                            }
                            <Text>Cash on delivery (COD)</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            borderColor: "#D0D0D0",
                            borderWidth: 2,
                            padding: 10,
                            margin: 10,
                            gap: 10,
                            alignItems: 'center'
                        }}>
                            {
                                paymentOption == 'card' ? (
                                    <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                                ) : (
                                    <Entypo name="circle" size={20} color="grey"
                                        onPress={() => {
                                            setPaymentOption("card")
                                            Alert.alert("UPI / Debit card", "Pay Online", [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => console.log("Cancel Pressed")
                                                },
                                                {
                                                    text: "Ok",
                                                    onPress: () => pay()
                                                }
                                            ])
                                        }
                                        } />
                                )
                            }
                            <Text>Card / UPI</Text>
                        </View>
                        <Pressable style={{
                            backgroundColor: "#FFC72C",
                            padding: 15,
                            borderRadius: 25,
                            margin: 15,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} onPress={() => setCurrStep(3)}>
                            <Text style={{ fontWeight: "500" }}>Continue</Text>
                        </Pressable>
                    </View>
                )
            }
            {
                currStep == 3 && paymentOption == 'cash' && (
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Order Now</Text>
                        <View style={{
                            borderColor: "#D0D0D0",
                            borderWidth: 2,
                            padding: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: 8,
                            backgroundColor: 'white'
                        }}>
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: 17 }}>Save 5% and never run out</Text>
                                <Text style={{ color: 'grey', fontSize: 15 }}>Turn on auto deliveries</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                        </View>
                        <View style={{
                            backgroundColor: 'white',
                            borderWidth: 2,
                            borderColor: "#D0D0D0",
                            padding: 10,
                            margin: 8
                        }}>
                            <Text style={{ fontSize: 18 }}>Shipping to {selectedaddress?.fullName}</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 5
                            }}>
                                <Text style={{ fontSize: 17, fontWeight: '500', color: 'grey' }}>Items</Text>
                                <Text style={{ fontSize: 17, color: 'grey' }}>₹{total}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 5
                            }}>
                                <Text style={{ fontSize: 17, fontWeight: '500', color: 'grey' }}>Delivery</Text>
                                <Text style={{ fontSize: 17, color: 'grey' }}>₹0</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 5
                            }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Order Total</Text>
                                <Text style={{ fontSize: 18, color: '#C60C30', fontWeight: 'bold' }}>₹{total}</Text>
                            </View>
                        </View>
                        <View style={{
                            backgroundColor: 'white',
                            borderWidth: 2,
                            borderColor: "#D0D0D0",
                            padding: 10,
                            margin: 8
                        }}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: 'grey' }}>Pay with</Text>
                            <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 7 }}>Cash on delivery (COD)</Text>
                        </View>
                        <Pressable style={{
                            backgroundColor: "#FFC72C",
                            padding: 15,
                            borderRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 8
                        }} onPress={handleOrder}>
                            <Text>Place your Order</Text>
                        </Pressable>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default ConfirmationScreen
