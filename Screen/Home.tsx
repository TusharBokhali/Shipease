import React, { useContext, useEffect, useState } from "react";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Platform, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, useWindowDimensions, Alert, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartAddincrese, CartRemoveDelete, CartSave, fetchGetAllCategories, fetchGetAllProducts, GetWishlistAdd, LandingPageAllPopular, WishlistAdd, WishlistDelete } from '../app/ApiService'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "./Loader";
import Voice from '@react-native-voice/voice';
import { showMessage } from "react-native-flash-message";
import Animated, { useHandler } from "react-native-reanimated";
import Carousel from 'react-native-reanimated-carousel';
import { CartContext, InterNetOff } from "@/contexts/CartContext";
// import * as Location from 'expo-location';


export default function Home() {
    const { AllCart, GetCartRecords } = useContext<any>(CartContext);
    const { internet, setInternet } = useContext<any>(InterNetOff);
    const { navigate, goBack } = useNavigation<any>();
    const [LandingPopularMainData, setLandingPopularMainData] = useState<any[]>([]);
    const [sliderMainApi, setslideMainApi] = useState<any[]>([])
    const [AllProduct, setAllProduct] = useState<any[]>([])
    const [GetAllCatgories, setGetAllCatgories] = useState<any[]>([])
    const [isLoading, setLoading] = useState(false)
    // const { width } = useWindowDimensions();
    const width = Dimensions.get('window').width;
    const [CartSaveGet, setCartSaveGet] = useState([]);
    const Focused = useIsFocused();
    const [WishlistAddAll, setWishlistAddAll] = useState<any>();
    const [MicData, setMicData] = useState<string[]>([]);
    const [started, setStarted] = useState('');
    const [categoryActive, setcategoryActive] = useState('All')
    const [sliderIndex, setSliderIndex] = useState(0)

    const True = <Octicons name="verified" size={24} color="green" style={{ marginRight: 5 }} />

    // const title = Platform.select({
    //     ios: {
    //         // back
    //     },
    //     android: {

    //     }
    // })

    // useEffect(() => {
    //     async function getCurrentLocation() {
          
    //       let { status } = await Location.requestForegroundPermissionsAsync();
    //       if (status !== 'granted') {
    //         console.log("Location", 'Permission to access location was denied');
    //         return;
    //       }
    
    //       let location = await Location.getCurrentPositionAsync({});
    //       console.log("Location", location);
    //     }
    
    //     getCurrentLocation();
    //   }, []);

    useEffect(() => {
        const getProducts = async () => {
            fetchGetAllProducts().then((res) => {
                setAllProduct(res.products);
            }).catch((e) => {
                console.log('Error fetching products:', e);
            }).finally(() => {
                setLoading(false);
            })
        };
        getProducts();
        GetSliderWithLangingPage();
        Favorates();
        GetAllCategory();
        // console.log("Platform", Platform)
    }, [Focused])
    const Favorates = async () => {
        try {
            const AllFav = await GetWishlistAdd(); 
            let id = AllFav.products.map((el: any) => {
                return el._id
            })
            setWishlistAddAll(id);
        } catch (error) {
            console.log(error);
        }
    }


    const GetSliderWithLangingPage = async () => {
        try {
            const data = await LandingPageAllPopular();
            setslideMainApi(data.welcomeSliders)
            setLandingPopularMainData(data);
        } catch (error) {
            console.log(error);

        }
    }

    const GetAllCategory = async () => {
        try {
            let data = await fetchGetAllCategories()
            let more = [{ name: "All" }, ...data]
            setGetAllCatgories(more)

        } catch (error) {
            console.log(error);
        }
    }

    const SaveProduct = async (Id: any) => {
        if (WishlistAddAll.includes(Id)) {
            try {
                const Del = await WishlistDelete(Id)
                Favorates();
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const Fav = await WishlistAdd(Id);
                Favorates();
            } catch (error) {
                console.log(error);
            }
        }

    }

    const CartSaves = async (id: never) => {
        try {
            await CartAddincrese(id)
            GetCartRecords()
            success('success', 'Cart Added!', 'Success', True);
        } catch (error) {
            console.log(error);

        }
    };

    const DeleteCartRemove = async (id: string) => {
        try {
            let data = await CartRemoveDelete(id);
            GetCartRecords()
        } catch (error) {
            console.log(error);
        }
    }

    const success = (typesAL: any, des: string, message = 'Success', img: any) => {
        showMessage({
            message: message,
            description: des,
            type: typesAL,
            icon: props => img
        });
    }

    const handlers = (event: any) => {
        const slideIndex = Math.round(
            event.nativeEvent.contentOffset.x / Dimensions.get("window").width
        );
        setSliderIndex(slideIndex)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 50 }}>
            <SafeAreaView style={[styles.container,]}>

                <TouchableOpacity style={{ width: '100%' }} onPress={() => navigate('ListPage')}>
                    <Animated.View sharedTransitionTag="tag" style={{ flexDirection: 'row', width: '100%', height: 46, paddingVertical: 2, alignItems: 'center', borderWidth: 0.5, borderColor: '#01B0ED', borderRadius: 7, paddingHorizontal: 10, justifyContent: 'space-between', backgroundColor: '#F4F4F4' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                            <View style={{ width: '10%', alignItems: 'center' }}>
                                <Image source={require('../assets/images/SearchIcons.png')} style={{ width: 16.19, height: 16, }} />
                            </View>

                            <TextInput
                                onPress={() => navigate('ListPage')}
                                focusable
                                placeholder='Searching for...'
                                style={{ borderLeftWidth: 0.5, borderColor: '#01B0ED', paddingHorizontal: 10, marginLeft: 10, width: '90%' }}
                            />
                        </View>
                        <TouchableOpacity style={{ width: '5%' }} onPress={() => navigate('ListPage')}>
                            <Image source={require('../assets/images/Mute.png')} style={{ width: 12.14, height: 15.31 }} />
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>

                <View style={{ marginTop: 30, padding: 0, margin: 'auto' }}>
                    <Carousel
                        pagingEnabled
                        loop
                        width={width - 50}
                        height={width / 2}
                        autoPlay={true}
                        data={sliderMainApi}
                        ref={undefined}
                        panGestureHandlerProps={{
                            activeOffsetX: [-10, 10],
                        }}
                        scrollAnimationDuration={1000}
                        autoPlayInterval={5000}
                        parallax-horizontal
                        onSnapToItem={(index) => setSliderIndex(index)}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={{ marginHorizontal: 10 }}>
                                <Image source={{ uri: item?.image?.url }} style={{ width: '100%', height: 150, resizeMode: 'cover', borderRadius: 20, marginRight: 10, shadowOpacity: 0.6 }} />
                            </TouchableOpacity>
                        )}
                    />
                </View>

                <View style={{ flexDirection: 'row', gap: 5, alignSelf: 'center', marginTop: 5}}>
                    {
                        sliderMainApi.map((el: any, inx: any) => {
                            return (
                                <View key={inx} style={sliderIndex === inx ? styles.Active : styles.Pagination}></View>
                            )
                        })
                    }
                </View>

                <View style={{ marginTop: 15, gap: 10, }}>
                    {
                        <FlatList
                            horizontal
                            data={GetAllCatgories}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity key={index} style={categoryActive === item.name ? styles.ActiveCategories : styles.Category} onPress={() => setcategoryActive(item.name)}>
                                        <Text style={{ fontSize: 14, fontWeight: '600', color: categoryActive === item.name ? 'white' : '#01B0ED', textAlign: 'center' }}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    }
                </View>
                <View style={{ marginTop: 20, flexDirection: 'row', width: '99%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#FF1276', fontWeight: '700', fontSize: 16, }}>Most Popular</Text>
                    <TouchableOpacity>
                        <Text style={{ fontSize: 10, fontWeight: '500', textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#000", }}>View All</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.MainCategory}>
                    {
                        isLoading ? (
                            <Loader />
                        ) : (
                            AllProduct.map((el, inx) => {
                                return (
                                    <TouchableOpacity key={inx} style={[styles.CategoryCard, { width: 150, }]} onPress={() => { navigate('ProductDetails', { data: el }) }}>
                                        <View style={[styles.CategoryTopImages,]}>
                                            <TouchableOpacity style={{ alignItems: 'flex-end', padding: 10, zIndex: 99 }} onPress={() => SaveProduct(el?._id)}>
                                                <AntDesign name="heart" size={16} color={WishlistAddAll?.includes(el._id) ? '#FF1276' : '#a8a5a5ca'} />
                                            </TouchableOpacity>
                                            <View style={{ alignItems: 'center', }}>
                                                <Image source={{ uri: el.thumbnail.thumbnail }} style={{ width: '80%', height: '85%', resizeMode: 'contain', objectFit: 'cover' }} />
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 12, fontWeight: '500', marginTop: 10, marginLeft: 5, }}>{String(el.name).slice(0, 40)}...</Text>
                                        </View>
                                        <View style={{ marginTop: 5, flexDirection: 'row', width: '99%', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '45%' }}>
                                                <Image source={require('../assets/images/Star.png')} style={{ width: 10, height: 9.55 }} />
                                                <Text style={{ fontSize: 10, fontWeight: '500' }}>{el.rating}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', width: '99%', alignItems: 'center', gap: 5 }}>
                                                <Text style={{ color: '#01B0ED', fontSize: 12, fontWeight: '500' }}>₹{el.price}</Text>
                                                <Text style={{ fontSize: 12, fontWeight: '500', opacity: 0.5, textDecorationLine: 'line-through', }}>₹{el.discountedPrice}</Text>
                                            </View>
                                        </View>
                                        {
                                            AllCart && AllCart.find((item: any) => item?.product?._id == el?._id) ? <TouchableOpacity style={{ width: 80, height: 25, backgroundColor: '#FF1276', justifyContent: 'center', alignItems: 'center', borderRadius: 3, alignSelf: 'flex-end', marginTop: 5 }} onPress={() => DeleteCartRemove(el._id as never)}>
                                                <Text style={{ fontSize: 10, fontWeight: '800', color: 'white' }}>Remove To Carto</Text>
                                            </TouchableOpacity> :
                                                <TouchableOpacity style={{ width: 80, height: 25, backgroundColor: '#FF1276', justifyContent: 'center', alignItems: 'center', borderRadius: 3, alignSelf: 'flex-end', marginTop: 5 }} onPress={() => CartSaves(el._id as never)}>
                                                    <Text style={{ fontSize: 10, fontWeight: '800', color: 'white' }}>Add To Cart</Text>
                                                </TouchableOpacity>
                                        }
                                    </TouchableOpacity>
                                )
                            })
                        )
                    }
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    MainCategory: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
    CategoryCard: {
        marginVertical:5,
        height: 270,
        paddingRight: 15,
    },
    CategoryTopImages: {
        width: '100%',
        height: 180,
        borderRadius: 7,
        backgroundColor: '#fcfcfc',
        zIndex: 1,
        marginHorizontal: 'auto'
    },
    Category: {
        padding: 10,
        backgroundColor: '#e7e2e2ca',
        borderRadius: 7,
        marginHorizontal: 10
    },
    ActiveCategories: {
        padding: 10,
        backgroundColor: '#FF1276',
        borderRadius: 7,
        marginHorizontal: 5
    },
    Pagination: {
        width: 10,
        height: 10,
        backgroundColor: '#01aeed65',
        borderRadius: 10
    },
    Active: {
        width: 40,
        height: 10, backgroundColor: '#FF1276',
        borderRadius: 90
    },
})

