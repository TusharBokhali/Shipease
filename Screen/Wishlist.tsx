import { CartAddincrese, GetWishlistAdd, WishlistDelete } from "@/app/ApiService";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "./Loader";
import { showMessage } from "react-native-flash-message";

export default function Wishlist() {
    const { navigate, goBack } = useNavigation();
    const [AllGetWishlist, setAllGetWishlist] = useState<any[]>([]);
    const [isloading, setLoading] = useState<boolean>(false);
    const [AllSaveId, setAllsaveId] = useState<string[]>([]);
    const Focused = useIsFocused();
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const True = <Octicons name="verified" size={24} color="green" style={{ marginRight: 5 }} />

    const Favorates = async () => {
        setLoading(true)
        try {
            const AllFav = await GetWishlistAdd();

            let id = AllFav.products.map((el: any) => {
                return el._id
            })
            setAllsaveId(id);
            setAllGetWishlist(AllFav.products);
            // setLoading(false)
            // console.log();
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const WishlistDelteMethod = async (Id: any) => {
        try {
            let del = await WishlistDelete(Id)
            Favorates();
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        Favorates();
    }, [Focused])


    // if (isloading) {
    //     return <Loader />
    // }
 const success = (typesAL: any, des: string, message = 'Success', img: any) => {
            showMessage({
                message: message,
                description: des,
                type: typesAL,
                icon: props => img
            });
        }
    const CartSaves = async (id: any) => {
           try {
                await CartAddincrese(id)
                success('success', 'Cart Added!','Success', True);
           } catch (error) {
            console.log(error);
            
           }
        };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center' }}>Wishlist</Text>
            {
                isloading ? <Loader /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    {AllGetWishlist?.length ? (
                        <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:50}}>
                            {
                                AllGetWishlist.map((el: any, inx: any) => {
                                    return (
                                        <View key={inx} style={{ marginTop: 10 }}>
                                            <Pressable style={styles.Products}>
                                                <View style={{ width: '88%', flexDirection: 'row', gap: 20 }}>

                                                    <View style={{ width: '20%' }}>
                                                        <View style={{ width: 65, height: 70, backgroundColor: '#e0dddd', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                                            <TouchableOpacity>
                                                                <Image source={require('../assets/images/Prod1.png')} style={{ width: 57, height: 36.5 }} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                    <View style={{ width: '80%', paddingBottom: 4, justifyContent: 'space-between' }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '95%', justifyContent: 'space-between' }}>
                                                            <Text>{el.name}</Text>
                                                        </View>
                                                        <View style={{ width: '70%', }}>
                                                            <View style={{ flexDirection: 'row', width: '99%', alignItems: 'center', gap: 5 }}>
                                                                <Text style={{ color: '#01B0ED', fontSize: 14, fontWeight: '500' }}>₹{el?.price}</Text>
                                                                <Text style={{ fontSize: 10, fontWeight: '500', opacity: 0.5, textDecorationLine: 'line-through', }}>₹{el?.discountedPrice}</Text>
                                                            </View>
                                                        </View>
                                                        <TouchableOpacity style={styles.BTN} onPress={()=>CartSaves(el._id)}>
                                                            <Text style={{ fontSize: 9, color: 'white', textAlign: 'center' }}>Add To Cart</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                <View style={{}}>
                                                    <TouchableOpacity onPress={() => WishlistDelteMethod(el._id)}>
                                                        <AntDesign name="heart" size={24} color={AllSaveId.includes(el._id) ? '#FF1276' : '#bebaba'} />
                                                    </TouchableOpacity>
                                                </View>
                                            </Pressable>
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                    ) :
                        (
                            <View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                    <View style={[styles.Box,{width:width * 0.8}]}>
                                        <View style={{ alignItems: 'center', marginTop: 50 }}>
                                            <Image source={require('../assets/images/heatDeatilas.png')} style={{ width: 153, height: 187, }} />
                                        </View>
                                        <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 24, fontWeight: '700' }}>Your Wishlist is empty.</Text>
                                        <Text style={{ fontSize: 12, fontWeight: '500', textAlign: 'center', opacity: 0.5, marginTop: 5 }}>You have no items in your cart.</Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={styles.PinkCircle}>
                                            <Image source={require('../assets/images/HeartsCart.png')} style={{ width: 37.5, height: 32.28 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View >
                        )
                    }
                </View>
            </View>
            }
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    Box: {
        height: 395,
        borderRadius: 10,
        backgroundColor: '#FEFDFC',
        shadowColor: '#00000040',
    },
    PinkCircle: {
        width: 80,
        height: 80,
        backgroundColor: '#FF1276',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bottom: 40
    },
    Products: {
        borderWidth: 0.2,
        borderColor: 'gray',
        borderRadius: 7,
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        gap: 10,
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        alignItems: 'center'
    },
    Decrement: {
        width: 16,
        height: 16,
        borderWidth: 0.3,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    BTN: {
        backgroundColor: '#FF1276',
        width: 80,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 3
    }
})