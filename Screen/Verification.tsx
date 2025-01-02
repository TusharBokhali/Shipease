import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';


export default function Verification(): JSX.Element {

    const inputs = useRef<Array<TextInput | null>>([]);
        const [focus,setFocus] = useState('')  
    const handleInputChange = (text: string, index: number) => {
        if (text.length === 1 && index < inputs.current.length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        
        if (e.nativeEvent.key === 'Backspace' && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const {navigate,goBack} = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={()=>goBack()}>
                <Image source={require('../assets/images/BackButton.png')} />
            </TouchableOpacity>
            <Image source={require('../assets/images/App_Logo.png')} style={styles.AppLogo} />

            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '700', lineHeight: 28.13 }}>Phone Verification</Text>
            <Text style={{ fontSize: 14, fontWeight: '500', color: 'rgba(0, 0, 0, 1)', textAlign: 'center', marginTop: 5, opacity: 0.5 }}>Please enter the code we just send to</Text>
            <Text style={{ textAlign: 'center', marginVertical: 10, fontWeight: '600', fontSize: 16 }}>+91 000 00 000 00</Text>
            <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center', marginVertical: 10 }}>
                {/* <TextInput
                    style={styles.Input}
                    textContentType="telephoneNumber"
                    keyboardType="number-pad"
                    maxLength={1}
                />

                <TextInput
                    style={styles.Input}
                    textContentType="oneTimeCode"
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign='center'
                />

                <TextInput
                    style={styles.Input}
                    textContentType="telephoneNumber"
                    keyboardType="number-pad"
                    maxLength={1}
                />

                <TextInput
                    style={styles.Input}
                    textContentType="telephoneNumber"
                    keyboardType="number-pad"
                    maxLength={1}
                /> */}
                {[...Array(4)].map((_, index) => (
                    <View key={index} style={[styles.MainInputs,{borderWidth: focus === index.toString() ? 1 : 0.5,borderColor:focus===index.toString() ? 'black' : 'gray'}]}>
                    <TextInput
                        style={styles.Input}
                        textContentType="oneTimeCode"
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={(text) => handleInputChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        ref={(ref) => (inputs.current[index] = ref)}
                        onFocus={()=>setFocus(index.toString())}

                        />
                        </View>
                ))}
            </View>
            <View style={{ flexDirection: 'row', width: '99%', gap: 5, justifyContent: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 14, fontWeight: '600' }}>If you don’t received a code?</Text>
                <TouchableOpacity>
                    <Text style={{ color: '#01B0ED', fontSize: 14, fontWeight: '500', textDecorationLine: 'underline' }}>Resend</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.BTN}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Continue</Text>
            </TouchableOpacity>
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
        height: 100,
        alignSelf: 'center'
    },
    MainInputs:{
        width: 45,
        height: 45,
        borderRadius: 7,
        justifyContent:'center',
        alignItems:'center',
        lineHeight:45
    },
    Input: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 45,
        
    },
    BTN: {
        backgroundColor: '#FF1276',
        borderRadius: 10,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        marginHorizontal: 'auto',
        marginTop: 20
    }
})