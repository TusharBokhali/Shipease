import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";

export default function Notification() {
    const { navigate, goBack } = useNavigation();
    const [Notification,setNotification] = useState(Array(4).fill(''))
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center',padding:15 }}>Notification</Text>
            <View style={{ marginTop: 30, }}>
               {
                Notification.map((el,inx)=>{
                    return (
                        <TouchableOpacity key={inx} style={{ borderTopWidth: 1, borderColor: '#00000040', borderBottomWidth: 1, paddingVertical: 10, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', width: '99%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, }}>
                                <Image source={require('../assets/images/TimeBest.png')} style={{ width: 24, height: 24 }} />
                                <Text style={{ fontWeight: '600', fontSize: 16 }}>order Arrived </Text>
                            </View>
                            <Text style={{ fontSize: 10, fontWeight: '500' }}>3:45</Text>
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: '500', opacity: 0.5, marginLeft: 5 }}>Lorem ipsum dolor sit amet consectetur. Augue ornare non pellentesque adipiscing quam suspendisse.dolor sit amet consectetur.</Text>
                    </TouchableOpacity>
                    )
                })
               }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 15
    },
})