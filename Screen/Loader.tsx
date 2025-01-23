import { View, Text } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Loader() {
    return (
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <LottieView
                source={require("../assets/images/Animation.json")}
                style={{ width: "20%", height: "20%" ,}}
                autoPlay
                loop
            />
        </SafeAreaView>
    )
}