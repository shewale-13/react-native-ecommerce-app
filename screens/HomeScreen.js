import { BackHandler, StyleSheet, View, Text, SafeAreaView, Platform, ScrollView, Pressable, TextInput, Image, Dimensions, Animated, Easing, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useEffect, useState, useRef, useContext, useId } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Carousel from 'react-native-reanimated-carousel';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { UserType } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const HomeScreen = () => {
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];
  const images = [
    "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
  ];
  const deals = [
    {
      id: "20",
      title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      oldPrice: 25000,
      price: 19000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
        "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
      ],
      color: "Stellar Green",
      size: "6 GB RAM 128GB Storage",
    },
    {
      id: "30",
      title:
        "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
      oldPrice: 74000,
      price: 26000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      ],
      color: "Cloud Navy",
      size: "8 GB RAM 128GB Storage",
    },
    {
      id: "40",
      title:
        "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
      oldPrice: 16000,
      price: 14000,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
        "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
      ],
      color: "Icy Silver",
      size: "6 GB RAM 64GB Storage",
    },
    {
      id: "40",
      title:
        "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
      oldPrice: 12999,
      price: 10999,
      image:
        "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
      ],
    },
  ];
  const offers = [
    {
      id: "0",
      title:
        "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
      offer: "72% off",
      oldPrice: 7500,
      price: 4500,
      image:
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
      ],
      color: "Green",
      size: "Normal",
    },
    {
      id: "1",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
      ],
      color: "black",
      size: "Normal",
    },
    {
      id: "2",
      title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
      offer: "40%",
      oldPrice: 7955,
      price: 3495,
      image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
      carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
      color: "black",
      size: "Normal",
    },
    {
      id: "3",
      title:
        "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
      offer: "40%",
      oldPrice: 24999,
      price: 19999,
      image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
      carouselImages: [
        "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
        "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
        "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
      ],
      color: "Norway Blue",
      size: "8GB RAM, 128GB Storage",
    },
  ];
  const navigation = useNavigation();

  const [address, setAddress] = useState([])
  const [selectedaddress, setSelectedAddress] = useState("")
  console.log("Selected: ", selectedaddress)
  const { userId, setUserId } = useContext(UserType)
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('userToken')
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.userId
      setUserId(userId)
    }
    fetchUser()
  }, [])
  useEffect(() => {
    if (userId) {
      fetchAddresses()
    }
  }, [modalVisible, userId])
  useFocusEffect(
    useCallback(() => {
      fetchAddresses()
    }, [])
  )
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:8000/addresses/${userId}`)
      const { address } = response.data
      setAddress(address)
    } catch (err) {
      console.log("Error ", err)
    }
  }
  const { width } = Dimensions.get('window');
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("jewelery");
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Jewelery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Women's clothing", value: "women's clothing" },
  ]);
  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false)
  }, [])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, [])
  const cart = useSelector((state) => state.cart.cart);

  const [modalVisible, setModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const openModal = () => {
    setShowModal(true);
    slideAnim.setValue(300);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setShowModal(false));
  };

  useEffect(() => {
    const backAction = () => {
      if (modalVisible) {
        closeModal();
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => subscription.remove();
  }, [modalVisible]);


  return (
    <>
      <SafeAreaView style={{ flex: 1, marginTop: Platform.OS === 'android' ? 38 : 0, backgroundColor: 'white' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
          <Pressable onPress={openModal}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              padding: 10,
              backgroundColor: '#AFEEEE',
            }}>
            <Ionicons name="location-outline" size={24} color="black" />
            <Pressable>
              {selectedaddress ? (
                <Text numberOfLines={1}>Deliver to {selectedaddress?.fullName} - {selectedaddress?.areaStreet}</Text>
              ) : (<Text style={{ fontSize: 15, fontWeight: "500" }}>Add Address</Text>
              )
              }
            </Pressable>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
              list.map((item, index) => (
                <Pressable key={index} style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                  <Image source={{ uri: item?.image }} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
                  <Text style={{ textAlign: 'center', fontSize: 12, fontWeight: '500', marginTop: 5 }}>{item?.name}</Text>
                </Pressable>
              ))
            }
          </ScrollView>
          <Carousel
            loop
            autoPlay
            data={images}
            scrollAnimationDuration={1000}
            width={width}
            height={200}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={{ width: width, height: 200, resizeMode: 'cover' }} />
            )} />

          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>Treanding Deals of the week</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            {
              deals.map((item, index) => (
                <Pressable style={{ marginVertical: 10, alignItems: 'center', flexDirection: "row" }} key={index}
                  onPress={
                    () => navigation.navigate('ProductInfo', {
                      id: item?.id,
                      title: item?.title,
                      price: item?.price,
                      carouselImages: item?.carouselImages,
                      color: item?.color,
                      size: item?.size,
                      oldPrice: item?.oldPrice,
                      item: item
                    })}>
                  <Image source={{ uri: item?.image }} style={{ width: 190, height: 190, resizeMode: 'contain' }} />
                </Pressable>
              ))
            }
          </View>

          <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 2, marginTop: 15 }} />
          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>Today's Deals</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
              offers.map((item, index) => (
                <Pressable key={index} style={{ marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}
                  onPress={
                    () => navigation.navigate('ProductInfo', {
                      id: item?.id,
                      title: item?.title,
                      price: item?.price,
                      carouselImages: item?.carouselImages,
                      color: item?.color,
                      size: item?.size,
                      oldPrice: item?.oldPrice,
                      item: item
                    })
                  }>
                  <Image source={{ uri: item?.image }} style={{ width: 150, height: 150, resizeMode: 'contain' }} />
                  <View style={{ backgroundColor: "#E31837", paddingVertical: 5, width: 130, alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: 10 }}>
                    <Text style={{ fontSize: 13, fontWeight: "bold", color: 'white', textAlign: 'center' }}>Upto {item.offer}</Text>
                  </View>
                </Pressable>
              ))
            }
          </ScrollView>

          <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 2, marginTop: 15 }} />

          <View style={{
            marginHorizontal: 10,
            width: "45%",
            marginBottom: open ? 50 : 15,
            marginTop: 20
          }}>
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15
              }}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="Choose category"
              // placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              zIndex={3000}
              zInderInverse={1000} />
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
            {
              products?.filter((item) => item.category === category).map((item, index) => (
                <ProductItem item={item} key={index} />
              ))
            }
          </View>
        </ScrollView>
      </SafeAreaView>
      {
        showModal && (
          <Animated.View style={[styles.overlay, {
            opacity: slideAnim.interpolate({
              inputRange: [0, 300],
              outputRange: [1, 0],
            })
          }]}>
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.backdrop} />
            </TouchableWithoutFeedback>

            <Animated.View
              style={[
                styles.modalView,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* MODAL CONTENT */}
              <Text style={styles.modalText}>Choose your Location</Text>
              <Text style={{ marginTop: 5, fontSize: 16, color: 'grey' }}>
                Select a delivery location to see product availability and delivery options
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                  address?.map((item, index) => (
                    <Pressable
                      onPress={() => setSelectedAddress(item)}
                      style={{
                        width: 140,
                        height: 140,
                        borderColor: "#D0D0D0",
                        borderWidth: 1,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 3,
                        marginRight: 15,
                        marginTop: 5,
                        backgroundColor: selectedaddress === item ? "#FBCEB1" : "white"
                      }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                        <Text style={{ fontSize: 13, fontWeight: 'bold' }}>{item?.fullName}</Text>
                        <Entypo name="location-pin" size={22} color="red" />
                      </View>
                      <Text numberOfLines={1} style={{ fontSize: 13, textAlign: 'center', width: 130 }}>{item?.flatHouse}, {item?.landmark}</Text>
                      <Text numberOfLines={1} style={{ fontSize: 13, width: 130, textAlign: 'center' }}>{item?.areaStreet}</Text>
                      <Text numberOfLines={1} style={{ fontSize: 13, width: 130, textAlign: 'center' }}>Maharashtra, India</Text>
                    </Pressable>
                  ))
                }
                <Pressable
                  style={{
                    width: 140,
                    height: 140,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    marginRight: 10,
                    marginTop: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                  }}
                  onPress={() => {
                    closeModal();
                    navigation.navigate('AddAddress');
                  }}
                >
                  <Text style={{ color: "#0066b2", textAlign: 'center', fontWeight: '500' }}>
                    Add an address or a pick-up point
                  </Text>
                </Pressable>
              </ScrollView>

              <View style={{ flexDirection: "column", gap: 10, marginVertical: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Entypo name="location-pin" size={22} color="#0066b2" />
                  <Text style={{ color: "#0066b2", fontWeight: "400" }}>Enter an Indian Pincode</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Ionicons name="locate-sharp" size={22} color="#0066b2" />
                  <Text style={{ color: "#0066b2", fontWeight: "400" }}>Use my current location</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <AntDesign name="earth" size={22} color="#0066b2" />
                  <Text style={{ color: "#0066b2", fontWeight: "400" }}>Deliver outside India</Text>
                </View>
              </View>

              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </Animated.View>
          </Animated.View>
        )}
    </>
  )
}

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: 'crimson',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: '#00000055',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end', // 👈 this pushes modal to bottom
    zIndex: 9999, // ensure it's on top
  },

  modalView: {
    width: '100%',
    maxHeight: '80%', // adjust as needed
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500'
  },
});
export default HomeScreen
