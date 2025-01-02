import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
export default function SingIn() {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity>
                <Image source={require('../assets/images/BackButton.png')} />
            </TouchableOpacity>
            <Image source={require('../assets/images/App_Logo.png')} style={styles.AppLogo} />

            <Text style={{textAlign:'center',fontSize:24,fontWeight:'700',lineHeight:28.13}}>Create Account</Text>
            <Text style={{fontSize:14,fontWeight:'500',color:'rgba(0, 0, 0, 1)',textAlign:'center',marginTop:5}}>Welcome to ShipEase,Please Sing Up</Text>

        <View>
            <View>
                <Text>Name</Text>
                <TextInput 
                
                />
            </View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },
    AppLogo: {
        width: 240,
        height: 134,
        alignSelf:'center'
    }
})