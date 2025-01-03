import React from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {

    const Sliders = [
        {
            id: 1,
            img: require('../assets/images/Slider.png')
        },

        {
            id: 2,
            img: require('../assets/images/Slider.png')
        }
    ];

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

            <View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    }
})