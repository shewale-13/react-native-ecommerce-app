import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'

const OrderScreen = () => {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Mains")
    }, 4000)
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("../assets/thumbs.json")}
          style={{ height: 260, width: 300 }}
          autoPlay
          loop={false}
          speed={0.7}
        />
        <Text style={{
          fontWeight: '600',
          marginTop: 20,
          fontSize: 19,
          textAlign: 'center'
        }}>
          Your order has been received
        </Text>
        <LottieView
          source={require("../assets/sparkle.json")}
          style={{
            height: 300,
            width: 300,
            position: "absolute",
            zIndex: 1,
            top: "50%",
            left: "50%",
            transform: [{ translateX: -150 }, { translateY: -150 }]
          }}
          autoPlay
          loop={false}
          speed={0.7}
        />
      </View>
    </SafeAreaView>

  )
}

export default OrderScreen

const styles = StyleSheet.create({})