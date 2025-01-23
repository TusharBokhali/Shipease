import { View, Text, SafeAreaView, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function Payments() {
    const { navigate, goBack } = useNavigation();
    const route = useRoute<any>();
    const [paymentOption, setPaymentOption] = useState<string>('')

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ padding: 15, paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Image source={require('../assets/images/BackButton.png')} style={{ width: 10, height: 17.28 }} />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '700' }}>Payment Methods</Text>
                <Text style={{ textAlign: 'center', opacity: 0.5, fontWeight: '500', marginTop: 10 }}>Select the payment method you would like to pay</Text>
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity style={styles.CardPayment} onPress={() => setPaymentOption('Razor Pay')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                            <Image source={require('../assets/images/RazorPay.png')} style={{ width: 40, height: 40.03 }} />
                            <Text style={styles.Text}>Razor Pay</Text>
                        </View>
                        <View style={paymentOption === 'Razor Pay' ? styles.Activecircle : styles.circle} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.CardPayment} onPress={() => setPaymentOption('Google Pay')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 25 }}>
                            <Image source={require('../assets/images/Google.png')} style={{ width: 34, height: 34.63 }} />
                            <Text style={styles.Text}>Google Pay</Text>
                        </View>
                        <View style={paymentOption === 'Google Pay' ? styles.Activecircle : styles.circle} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.CardPayment} onPress={() => setPaymentOption('Paypal')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 28 }}>
                            <Image source={require('../assets/images/Paypal.png')} style={{ width: 29.67, height: 35 }} />
                            <Text style={styles.Text}>Paypal</Text>
                        </View>
                        <View style={paymentOption === 'Paypal' ? styles.Activecircle : styles.circle} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.CardPayment, { marginBottom: 30 }]} onPress={() => setPaymentOption('ATM')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 22 }}>
                            <Image source={require('../assets/images/ATM.png')} style={{ width: 40.45, height: 25 }} />
                            <Text style={styles.Text}>---- ---- ---- 4863</Text>
                        </View>
                        <View style={paymentOption === 'ATM' ? styles.Activecircle : styles.circle} />
                    </TouchableOpacity>

                    <View style={{ borderWidth: 2, width: '90%', margin: 'auto', borderColor: '#D9D9D9' }} />
                    <Text style={{ textAlign: 'center', position: 'relative', bottom: 10, width: 25, backgroundColor: 'white', margin: 'auto' }}>OR</Text>


                    <TouchableOpacity style={styles.CardPayment} onPress={() => setPaymentOption('Cash')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
                            <Image source={require('../assets/images/Money.png')} style={{ width: 42, height: 42 }} />
                            <Text style={styles.Text}>Cash On Delivery</Text>
                        </View>
                        <View style={paymentOption === 'Cash' ? styles.Activecircle : styles.circle} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.Fixed}>
                <View style={{ flexDirection: 'row', width: '80%', margin: 'auto', justifyContent: 'space-between', marginTop: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>Order Total</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>₹{route.params?.totalprice}</Text>
                        <Text style={{ marginTop: 5, textDecorationLine: 'line-through', opacity: 0.5, fontSize: 12, fontWeight: '500' }}>₹{route.params?.discount}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.BTN}>
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: '600' }}>Pay Now</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    CardPayment: {
        width: '90%',
        borderWidth: 0.5,
        margin: 'auto',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderRadius: 7,
        backgroundColor: '#FFF',
        elevation: 5,
        marginVertical: 10,
        paddingLeft: 30,
        height: 60
    },
    circle: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderRadius: 50,
    },
    Activecircle: {
        width: 15,
        height: 15,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: '#FF1276',
        borderColor: '#FF1276'
    },
    Text: {
        fontSize: 16,
        fontWeight: '600'

    },
    Fixed: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 0.5,
        padding: 10,
    },
    BTN: {
        width: '80%',
        backgroundColor: '#FF1276',
        margin: 'auto',
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10
    }
})