import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, } from 'react-native'
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
export default function SingIn() {
    const [isSelected, setSelected] = useState(false);
    const [seen,setSeen] = useState(false)
    const [seen1,setSeen1] = useState(false)
    const [name,setName] = useState('');
    const [email,setEmail]= useState('');
    const [number,setNumber] = useState('');
    const [Password,setPassword]= useState('');
    const [confirm,setConfirm] = useState('');
    const [focus,setFocus] = useState('')
    const {navigate,goBack} = useNavigation<any>();
    const Register = ()=>{
        setName('')
        setNumber('')
        setEmail('')
        setPassword('')
        setConfirm('')
        setSelected(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={()=>goBack()}>
                <Image source={require('../assets/images/BackButton.png')} style={{width:9.2,height:15.19}}/>
            </TouchableOpacity>
            <Image source={require('../assets/images/App_Logo.png')} style={styles.AppLogo} />

            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '700', lineHeight: 28.13 }}>Create Account</Text>
            <Text style={{ fontSize: 14, fontWeight: '500', color: 'rgba(0, 0, 0, 1)', textAlign: 'center', marginTop: 5,opacity:0.5 }}>Welcome to ShipEase,Please Sing Up</Text>

            <View>
                <View style={styles.MainInput}>
                    <Text style={styles.Label}>Name</Text>
                    <TextInput
                        placeholder="Name"
                        style={[styles.Input,{borderWidth:focus==='1' ? 1 : 0.5,borderColor:focus==='1' ? 'black' :'gray'}]}
                        onChangeText={setName}
                        value={name}
                        onFocus={()=>setFocus('1')}
                    />
                </View>

                <View style={styles.MainInput}>
                    <Text style={styles.Label}>Email</Text>
                    <TextInput
                        placeholder="your email"
                        style={[styles.Input,{borderWidth:focus==='2' ? 1 : 0.5,borderColor:focus==='2' ? 'black' :'gray'}]}
                        onChangeText={setEmail}
                        value={email}
                        onFocus={()=>setFocus('2')}

                    />
                </View>

                <View style={styles.MainInput}>
                    <Text style={styles.Label}>Phone number</Text>
                    <TextInput
                        placeholder="Enter number"
                        style={[styles.Input,{borderWidth:focus==='3' ? 1 : 0.5,borderColor:focus==='3' ? 'black' :'gray'}]}
                        onChangeText={setNumber}
                        value={number}
                        textContentType="telephoneNumber"
                        keyboardType="number-pad"
                        onFocus={()=>setFocus('3')}

                    />
                </View>

                <View style={[styles.MainInput]}>
                    <Text style={styles.Label}>Password</Text>
                    <View style={[styles.Input, { flexDirection: 'row', alignItems: 'center' ,borderWidth:focus==='4' ? 1 : 0.5,borderColor:focus==='4' ? 'black' :'gray'}]}>
                        <TextInput
                            placeholder="your Password"
                            style={{width:'90%',fontSize:16,fontWeight:'500',}}
                            secureTextEntry={!seen}
                            onChangeText={setPassword}
                            value={Password}
                        onFocus={()=>setFocus('4')}

                        />
                        <TouchableOpacity onPress={()=>setSeen(!seen)}>
                            {
                                seen ? (
                            <Image source={require('../assets/images/Show.png')} />

                                ) : (
                            <Image source={require('../assets/images/Hide.png')} />

                                )
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.MainInput}>
                    <Text style={styles.Label}>Confirm Password</Text>
                    <View style={[styles.Input,{flexDirection:'row',alignItems:'center',borderWidth:focus==='5' ? 2 : 0.5,borderColor:focus==='5' ? 'black' :'gray'}]}>
                    <TextInput
                        placeholder="your Confirm Password"
                        style={{width:'90%',fontSize:16,fontWeight:'500'}}
                        secureTextEntry={!seen1}
                        onChangeText={setConfirm}
                        value={confirm}
                        onFocus={()=>setFocus('5')}
                        />
                         <TouchableOpacity onPress={()=>setSeen1(!seen1)}>
                         {
                                seen1 ? (
                            <Image source={require('../assets/images/Show.png')} />

                                ) : (
                            <Image source={require('../assets/images/Hide.png')} />

                                )
                            }
                        </TouchableOpacity>
                        </View>
                </View>
                <View style={[styles.MainInput, { flexDirection: "row", gap: 10, marginTop: 15 }]}>
                    <Checkbox
                        value={isSelected}
                        onValueChange={setSelected}
                        style={styles.checkbox}
                    />
                    <View>
                        <Text>By continuing, you agree to ShipEase’s</Text>
                        <View style={{ flexDirection: 'row', width: '99%', }}>

                            <TouchableOpacity >
                                <Text style={styles.OtherStyle}>Conditions of use </Text>
                            </TouchableOpacity>
                            <Text> and </Text>
                            <TouchableOpacity >
                                <Text style={styles.OtherStyle}> Privacy Notice.</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.BTN} onPress={()=>navigate('Verification')}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>Register</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', width: '99%', gap: 5, justifyContent: 'center', marginTop: 10 }}>

                    <Text style={{ fontSize: 14, fontWeight: '600' }}>Already have an account?</Text>
                    <TouchableOpacity onPress={()=>navigate('LogIn')}>
                        <Text style={{ color: '#01B0ED', fontSize: 14, fontWeight: '500',textDecorationLine:'underline' }}>Login</Text>
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
        borderColor: 'gray',
        fontWeight: '500',
        fontSize: 16,
    },
    Label: {
        marginBottom: 5,
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 10
    },
    checkbox: {
        borderRadius: 5
    },
    OtherStyle: {
        textDecorationStyle: 'solid',
        textDecorationColor: '#01B0ED',
        textDecorationLine: 'underline',
        fontSize: 14,
        fontWeight: '400',
        color: '#01B0ED'
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