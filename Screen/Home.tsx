import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {

    const { width } = useWindowDimensions();

    const Sliders = [
        {
            id: 1,
            img: require('../assets/images/Slider.png')
        },
        {
            id: 2,
            img: require('../assets/images/Rectangle.png')
        },

    ];

    const Categoty = [
        {
            id: '1',
            img: require('../assets/images/Slider.png')
        },
    ]

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', width: '100%', gap: 10 }}>
                <View style={{ flexDirection: 'row', width: '85%', height: 46, paddingVertical: 2, alignItems: 'center', borderWidth: 0.5, borderColor: '#01B0ED', borderRadius: 7, paddingHorizontal: 10, justifyContent: 'space-between', backgroundColor: '#F4F4F4' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '90%' }}>
                        <View style={{ width: '10%', alignItems: 'center' }}>
                            <Image source={require('../assets/images/SearchIcons.png')} style={{ width: 16.19, height: 16, }} />
                        </View>

                        <TextInput
                            placeholder='Searching for...'
                            style={{ borderLeftWidth: 0.5, borderColor: '#01B0ED', paddingHorizontal: 10, marginLeft: 10, width: '90%' }}
                        />
                    </View>
                    <TouchableOpacity style={{ width: '5%' }}>
                        <Image source={require('../assets/images/Mute.png')} style={{ width: 12.14, height: 15.31 }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ width: 46, height: 46, backgroundColor: '#FF1276', borderRadius: 7, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/images/Filter.png')} style={{ width: 16, height: 18 }} />
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 50, }}>
                <FlatList
                    data={Sliders}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <Image source={item.img} style={{ width: width - 70, height: 150, resizeMode: 'cover', borderRadius: 20, marginRight: 10 }} />
                        </TouchableOpacity>
                    )}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
            <View style={{ marginTop: 20, flexDirection: 'row', width: '99%', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: '#FF1276', fontWeight: '700', fontSize: 16, }}>Most Popular</Text>
                <TouchableOpacity>
                    <Text style={{ fontSize: 10, fontWeight: '500', textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#000", }}>View All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.MainCategory}>
                <TouchableOpacity style={styles.CategoryCard}>
                    <View style={styles.CategoryTopImages}>
                        <TouchableOpacity style={{ width: '100%', alignItems: 'flex-end', padding: 10 }}>
                            <AntDesign name="heart" size={16} color="#a8a5a5ca" style={{}} />
                        </TouchableOpacity>
                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../assets/images/Prod1.png')} style={{ width: 114, height: 73 }} />
                        </View>
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: '500', marginTop: 10, marginLeft: 5 }}>Land Rover Defender</Text>
                    <View style={{ marginTop: 5, flexDirection: 'row', width: '99%', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, width: '45%' }}>
                            <Image source={require('../assets/images/Star.png')} style={{ width: 10, height: 9.55 }} />
                            <Text style={{ fontSize: 10, fontWeight: '500' }}>4.8</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: '99%', alignItems: 'center', gap: 5 }}>
                            <Text style={{ color: '#01B0ED', fontSize: 12, fontWeight: '500' }}>₹1,997</Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', opacity: 0.5, textDecorationLine: 'line-through', }}>₹1999</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ width: 60, height: 15, backgroundColor: '#FF1276', justifyContent: 'center', alignItems: 'center', borderRadius: 3, alignSelf: 'flex-end', marginTop: 5 }}>
                        <Text style={{ fontSize: 7, color: 'white' }}>Add To Cart</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    MainCategory: {
        marginTop: 20
    },
    CategoryCard: {
        width: 130,
        height: 209,
        // borderWidth:1
    },
    CategoryTopImages: {
        width: 130,
        height: 140,
        borderRadius: 7,
        backgroundColor: '#e0dddd',

    }
})