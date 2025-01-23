import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar, useWindowDimensions, FlatList, Dimensions, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { CartAddincrese, fetchGetDetailsPRoducts, GetWishlistAdd, WishlistDelete, WishlistAdd } from '@/app/ApiService';
import { showMessage } from 'react-native-flash-message';
import Loader from './Loader';


export default function ProductDetails() {
    const { navigate, goBack } = useNavigation();
    const route = useRoute<any>();
    const [Products, setProducts] = useState<any>([]);
    const [Count, setCount] = useState(1);
    const [open, setopen] = useState(false)
    const [isLoading, setLoading] = useState(true)
    const { width, height } = useWindowDimensions();
    const [activeIn, setActiveIndex] = useState(0)
    const [WishlistAddAll, setWishlistAddAll] = useState<string[]>([])
    useEffect(() => {
        const GetData = async (id: any) => {
            try {
                const data = await fetchGetDetailsPRoducts(id);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }

        GetData(route?.params?.data?._id);
        Favorates();
    }, [])
    const handleScroll = (event: any) => {
        const slideIndex = Math.round(
            event.nativeEvent.contentOffset.x / Dimensions.get("window").width
        );
        setActiveIndex(slideIndex);
    };

    const Popup = (typesAL: any, des: string, message = 'Success',) => {
        showMessage({
            message: message,
            description: des,
            type: typesAL,
        });
    }
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

    const CartSaves = async (id: any) => {
        try {
            await CartAddincrese(id)
            Popup('success', 'Cart Added!', 'Success',);
        } catch (error) {
            console.log(error);
            Popup('danger', 'Cart Already Added!', 'Warnning',);
        }
    };


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

    return (
        <SafeAreaView style={styles.containder}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    isLoading ? (
                        <Loader />
                    ) : (
                        <View style={{ height: height, justifyContent: 'space-between' }}>
                            <View>

                                <View style={[{ backgroundColor: '#ffffff', padding: 15, height: height * 0.4, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }]}>
                                    <TouchableOpacity onPress={() => goBack()}>
                                        <Image source={require('../assets/images/BackButton.png')} style={{ width: 10, height: 17.28 }} />
                                    </TouchableOpacity>
                                    <View style={[styles.Shadow, { justifyContent: 'center' }]}>
                                        <View style={{ marginTop: 10, justifyContent: 'center', width: width, }}>
                                            <FlatList
                                                data={Products.images}
                                                horizontal
                                                onScroll={handleScroll}
                                                pagingEnabled
                                                keyExtractor={(_, index) => index.toString()}
                                                showsHorizontalScrollIndicator={false}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <Image key={index} source={{ uri: item.thumbnail }} style={{ width: width, height: 200, resizeMode: 'contain' }} />
                                                    )
                                                }}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', gap: 5, position: 'absolute', bottom: -40, alignSelf: 'center' }}>
                                            {
                                                Products.images.map((el: any, inx: React.Key | null | undefined) => {
                                                    return (
                                                        <View key={inx} style={activeIn === inx ? styles.Active : styles.Pagination}></View>
                                                    )
                                                })
                                            }
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.MainContent}>
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-start' }}>
                                        <View style={{ width: '90%' }}>
                                            <Text style={{ fontSize: 20, fontWeight: '500', }}>{Products.slug}</Text>
                                            <View style={{ flexDirection: 'row', width: '100%', gap: 10, marginTop: 10, alignItems: 'center' }}>
                                                <View style={{ backgroundColor: '#cccbcb', paddingHorizontal: 5, borderRadius: 4 }}>
                                                    <Text style={{ color: 'white', fontSize: 10, textAlign: 'center', letterSpacing: 0.5, fontWeight: '500', }}>{Products?.sku}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '45%' }}>
                                                    <Image source={require('../assets/images/Star.png')} style={{ width: 13.33, height: 12.73 }} />
                                                    <Text style={{ fontSize: 16, fontWeight: '500' }}>{Products.rating}</Text>
                                                    <Text style={{ opacity: 0.5, fontWeight: '500' }}>{Products.reviews}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => SaveProduct(Products._id)}>
                                                <AntDesign name="heart" size={34} color={WishlistAddAll.includes(Products?._id) ? '#FF1276' : '#bebaba'} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10, width: '100%' }}>
                                        <Text style={{ fontSize: 20, fontWeight: '500' }}>Description</Text>
                                        <Text style={{ fontSize: 12, fontWeight: '500', opacity: 0.5, marginTop: 5 }}>{Products.description}</Text>
                                        <View style={{ flexDirection: 'row', width: '99%', alignItems: 'center', gap: 20, marginTop: 20 }}>
                                            <Text style={{ fontSize: 20, fontWeight: '500' }}>Quantity</Text>
                                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                                <TouchableOpacity style={styles.Decrement} onPress={() => {
                                                    if (Count > 1) {
                                                        setCount(Count - 1)
                                                    } else {
                                                        Popup('danger', 'Minimum Purchase 1', 'Quantity')
                                                    }
                                                }}>
                                                    <View style={{ backgroundColor: '#FF1276', width: 13, height: 2 }}></View>
                                                </TouchableOpacity>
                                                <Text style={{ fontSize: 24, fontWeight: '600' }}>{Count}</Text>
                                                <TouchableOpacity style={[styles.Decrement, { backgroundColor: '#FF1276', borderWidth: 0 }]} onPress={() => {
                                                    if (Products.maxPurchaseQuantity > 1) {
                                                        setCount(Count + 1)
                                                    } else {
                                                        Popup('danger', `Maximum Purchase ${Products.maxPurchaseQuantity}`, 'Quantity')
                                                    }
                                                }}>
                                                    <Image source={require('../assets/images/Plus.png')} style={{ width: 13.6, height: 13.6 }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ bottom: 0 }}>
                                <View style={{ flexDirection: 'row', width: width, justifyContent: 'space-around', padding: 15, }}>
                                    <View style={{ width: '40%' }}>
                                        <Text style={{ fontSize: 12, fontWeight: '500', opacity: 0.5 }}>Product Price</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                            <Text style={{ color: '#01B0ED', fontSize: 22, fontWeight: '500' }}>₹{Products.price * Count}</Text>
                                            <Text style={{ fontSize: 16, fontWeight: '500', opacity: 0.5, textDecorationLine: 'line-through', }}>₹{Products.discountedPrice}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{ backgroundColor: '#FF1276', width: 180, height: 45, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => CartSaves(Products._id)}>
                                        <Text style={{ fontSize: 22, fontWeight: '600', color: 'white' }}>Add To Cart</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containder: {
        flex: 1,
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
    MainContent: {
        padding: 15,
    },
    Decrement: {
        width: 27,
        height: 27,
        borderWidth: 0.3,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Shadow: {
        borderTopColor: '#e0e0e0',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
})