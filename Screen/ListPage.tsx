import { View, Text, StyleSheet, TouchableOpacity, Pressable, Image, TextInput, useWindowDimensions, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export default function ListPage() {
    const [open, setopen] = useState(false)
    const { navigate, goBack } = useNavigation();
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    return (
        <SafeAreaView style={styles.Container}>
            <View style={{ flexDirection: 'row', width: width > 400 ? width * 0.95 : width * 0.90, gap: 10,marginBottom:20,shadowOffset:{width:1,height:0.5},shadowColor:'gray',shadowOpacity:0.8}}>
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
                <View style={{ width: width * 0.5 }}>
                    <TouchableOpacity style={{ width: 46, height: 46, backgroundColor: '#FF1276', borderRadius: 7, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../assets/images/Filter.png')} style={{ width: 16, height: 18 }} />
                    </TouchableOpacity>
                </View>
            </View>
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
                            <Text>Land Rover Defender</Text>
                        </View>
                        <View style={{ width: '70%', }}>
                            <View style={{ flexDirection: 'row', width: '99%', alignItems: 'center', gap: 5 }}>
                                <Text style={{ color: '#01B0ED', fontSize: 14, fontWeight: '500' }}>₹1,997</Text>
                                <Text style={{ fontSize: 10, fontWeight: '500', opacity: 0.5, textDecorationLine: 'line-through', }}>₹1999</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.BTN}>
                            <Text style={{ fontSize: 9, color: 'white', textAlign: 'center' }}>Add To Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{}}>
                    <TouchableOpacity onPress={() => {
                        setopen(!open)
                    }}>
                        <AntDesign name="heart" size={24} color={open ? '#FF1276' : '#bebaba'} />
                    </TouchableOpacity>
                </View>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 15
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