import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

const ProductItem = ({ item }) => {
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
    <Pressable style={{ marginVertical: 25, marginHorizontal: 20 }}>
      <Image source={{ uri: item?.image }} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
      <Text style={{ width: 150, marginTop: 10 }} numberOfLines={1}>{item?.title}</Text>

      <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>₹{item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: 'bold' }}>{item?.rating?.rate} ratings</Text>
      </View>

      <Pressable
        onPress={() => addItemToCart(item)}
        style={{ backgroundColor: "#FFC72C", padding: 10, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginHorizontal: 10 }}>
        {
          addedToCart ? <Text>Added to Cart</Text> : <Text>Add to Cart</Text>
        }
      </Pressable>
    </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({})