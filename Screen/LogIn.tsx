import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
export default function LogIn() {
    const {navigate,goBack} = useNavigation();
    const [number, setNumber] = useState('+91 ');
    const [Password, setPassword] = useState('');
    const [seen, setSeen] = useState(false)
    const [focus,setFocus] = useState('')


    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={()=>goBack()}>
                <Image source={require('../assets/images/BackButton.png')} />
            </TouchableOpacity>
            <Image source={require('../assets/images/App_Logo.png')} style={styles.AppLogo} />
            <View style={{ flexDirection: 'row', width: '99%', gap: 5, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '700', lineHeight: 28.13 }}>Welcome Back</Text>
                <Image source={require('../assets/images/Hello_Emoji.png')} />
            </View>
            <Text style={{ fontSize: 14, fontWeight: '500', color: 'rgba(0, 0, 0, 1)', textAlign: 'center', marginVertical: 5,opacity:0.5}}>Log In your account</Text>
            <View style={styles.MainInput}>
                <Text style={styles.Label}>Phone number</Text>
                <TextInput
                    placeholder="Enter number"
                    style={[styles.Input,{borderWidth:focus==='1' ? 1 : 0.5,borderColor:focus==='1' ? 'black' :'gray'}]}
                    onChangeText={setNumber}
                    value={number}
                    textContentType="telephoneNumber"
                    keyboardType="number-pad"
                    onFocus={()=>setFocus('1')}
                />
            </View>
            <View style={styles.MainInput}>
                <Text style={styles.Label}>Password</Text>
                <View style={[styles.Input, { flexDirection: 'row', alignItems: 'center',borderWidth:focus==='2' ? 1 : 0.5,borderColor:focus==='2' ? 'black' :'gray' }]}>
                    <TextInput
                        placeholder="your Password"
                        style={{ width: '90%' }}
                        secureTextEntry={!seen}
                        onChangeText={setPassword}
                        value={Password}
                        onFocus={()=>setFocus('2')}
                    />
                    <TouchableOpacity onPress={() => setSeen(!seen)}>
                        {
                            seen ? (
                                <Image source={require('../assets/images/Show.png')} />

                            ) : (
                                <Image source={require('../assets/images/Hide.png')} />

                            )
                        }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{marginTop:15,marginLeft:10}}>
                    <Text style={{fontSize:18,fontWeight:'500',color:'#01B0ED'}}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.BTN}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'white'  }}>Login</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',width:'99%',gap:5,justifyContent:'center',marginTop:10}}>
                    <Text style={{fontWeight:'500'}}>Don't have an account?</Text>
                    <TouchableOpacity onPress={()=>navigate('SingUp')}>
                        <Text style={{ color: '#01B0ED', fontSize: 14, fontWeight: '500',textDecorationLine:'underline'}}>Sing Up</Text>
                    </TouchableOpacity>
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
        height: 100,
        alignSelf: 'center'
    },
    MainInput: {
        width: '90%',
        marginHorizontal: 'auto',
        marginTop: 10
    },
    Input: {
        borderWidth: 0.5,
        borderRadius: 10,
        paddingLeft: 15,
        fontWeight: '500',
        fontSize: 16,
        borderColor: 'gray',
    },
    Label: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 10
    },
    BTN:{
        backgroundColor: '#FF1276',
        borderRadius: 10,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginHorizontal: 'auto',
        marginTop: 20
    }
})