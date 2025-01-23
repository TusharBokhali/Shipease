import { AntDesign, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Alert, Image, Modal, ScrollView, TextInput, useWindowDimensions } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AddressSaveAPINew, BuinessAPIAddresssUpdate, DefaultAddressSet, DeletesAddress, GetAllAddress, PersonalAddressUpdate } from '../app/ApiService'
import Alerts from '@mui/material/Alert';
import { showMessage } from "react-native-flash-message";


export default function Profile() {
    const { width, height } = useWindowDimensions();
    const { navigate, goBack } = useNavigation();
    const [modelOpen, setModelOpen] = useState<boolean>(false)
    const [Address, setAddress] = useState<string>('')
    const [defaultId, setdefaultId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [personalAdress, setPersonalAdress] = useState<any>([]);
    const [home, setHome] = useState('')
    const [citys, setCity] = useState('');
    const [pipncode, setpincode] = useState('')
    const [Area, setArea] = useState('');
    const [states, setState] = useState('');
    const [Business, setBusiness] = useState<any>("");
    const [BuinesAddresSort, setBuinesAddresSort] = useState<any>('');
    const [editModal, setEditModal] = useState<boolean>(false);
    const [id, setId] = useState(null);
    const [GST, setGST] = useState(false)
    const [AddGST, setAddGST] = useState('');
    const [defaults,setdefault] = useState<boolean>(false)
    const [checkDefault,setCheckdefaults]=useState<boolean>(false)
    const Close = <Octicons name="issue-closed" size={24} color="red" style={{ marginRight: 5 }} />;
    const True = <Octicons name="verified" size={24} color="green" style={{ marginRight: 5 }} />

    const SaveAddAdress = async () => {
        if (GST) {
            let AddressVar: object = {
                "bussinessTitle": name,
                "GSTNumber": AddGST,
                "mobileNo": number,
                "houseNo": home,
                "addressLine": Address,
                "area": Area,
                "landmark": "",
                "pincode": pipncode,
                "city": citys,
                "state": states
            };

            try {
                const BusinessAddress = await BuinessAPIAddresssUpdate(AddressVar);
                // console.log(BusinessAddress);

                setBusiness(BusinessAddress)
                Buisness();
                setModelOpen(false)
                setGST(false)
                success('success', 'successfully Update Business Address!', 'Update', True);
                return BusinessAddress;
            } catch (error) {
                console.log(error);
            }
        } else {

            if (editModal) {
                if (name && Address && number && home && citys && pipncode && Area && states) {
                    const AddressVar: object = {
                        _id: id,
                        fullName: name,
                        mobileNo: number,
                        houseNo: home,
                        addressLine: Address,
                        area: Area,
                        landmark: "",
                        pincode: pipncode,
                        city: citys,
                        state: states,
                    };
                    const getProducts = async (AddressVar?: any) => {
                        try {
                            const data = await PersonalAddressUpdate(AddressVar);
                            if(checkDefault){
                                await DefaultAddressSet(AddressVar?._id)
                            }
                            setPersonalAdress(data.addresses);
                            Buisness();
                            setdefault(false)
                            success('success', 'successfully update address !', 'Update', True);
                            return data;
                        } catch (error) {
                            console.log('Error fetching products:', error);

                        }
                    }
                    getProducts(AddressVar);
                    setName('');
                    setAddress('');
                    setNumber('');
                    setHome('');
                    setCity('');
                    setpincode('');
                    setArea('');
                    setState('');
                    setCheckdefaults(false)
                    setId(null)
                    setEditModal(false)
                    setModelOpen(false)
                } else {
                    success('default', 'Enter Update Address !', 'update', Close);

                }
            } else {
                if (name && Address && number && home && citys && pipncode && Area && states) {
                    const AddressVar: object = {
                        fullName: name,
                        mobileNo: number,
                        houseNo: home,
                        addressLine: Address,
                        area: Area,
                        landmark: "",
                        pincode: pipncode,
                        city: citys,
                        state: states
                    };
                    const getProducts = async (AddressVar?: object) => {
                        try {
                            const data = await AddressSaveAPINew(AddressVar);
                            Buisness()
                            setdefault(false)
                            return data;
                        } catch (error) {
                            console.log('Error fetching products:', error);
                        }

                        setName('');
                        setAddress('');
                        setNumber('');
                        setHome('');
                        setCity('');
                        setpincode('');
                        setArea('');
                        setState('');
                        setCheckdefaults(false)
                    }
                    getProducts(AddressVar);
                    success('success', 'successfully address added !', 'Success', True);
                    setModelOpen(false);
                } else {
                    success('danger', 'Enter Update Address !', 'Wrong', Close);
                }
            }
        }
    }

    // const defaultsetFun = async() =>{
    //     try {
            
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const success = (typesAL: any, des: string, message = 'Success', img: any) => {
        showMessage({
            message: message,
            description: des,
            type: typesAL,
            icon: props => img
        });
    }

    const Buisness = async () => {
        try {
            const BusinessAddress = await GetAllAddress();
            setPersonalAdress(BusinessAddress.addresses)
            setBusiness(BusinessAddress.bussinessAddress)

        } catch (error) {
            console.log(error);
        }
    }
   

    const EditAddress = (el: any,inx:any) => {
        if(inx===0){
            setdefault(true)
        }
        setModelOpen(true)
        setName(el.fullName)
        setNumber(el.mobileNo)
        setAddress(el.addressLine)
        setHome(el.houseNo)
        setArea(el.area)
        setCity(el.city)
        setpincode(el.pincode)
        setState(el.state)
        setId(el._id);
        setEditModal(true)
    }

    const Deletes = async (el: any) => {
        Alert.alert('Delete Address', 'Are you sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
            },
            {
                text: 'OK', onPress: async () => {
                    try {
                        const BusinessAddress = await DeletesAddress(el._id);
                        Buisness();
                        success('success', 'successfully Delete Address!', 'Delete', True);
                        return BusinessAddress;
                    } catch (error) {
                        console.log(error);
                        success('danger', 'Default Address Not Deletes! !', 'Warnning', Close);
                    }
                }
            },
        ])

    }

    const BuinesAddresssUpdate = async () => {
        setGST(true);
        setModelOpen(true)
        setName(Business.bussinessTitle)
        setNumber(Business.mobileNo)
        setAddress(Business.addressLine)
        setHome(Business.houseNo)
        setArea(Business.area)
        setCity(Business.city)
        setpincode(Business.pincode)
        setState(Business.state)
        setAddGST(Business.GSTNumber)
    }

    useEffect(() => {
        Buisness();
    }, [])
    const Emptys = () => {
        setModelOpen(true)
        setName('')
        setNumber('')
        setAddress('')
        setHome('')
        setArea('')
        setCity('')
        setpincode('')
        setState('')

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 50, opacity: modelOpen ? 0.5 : 1, backgroundColor: modelOpen ? '#000000cf' : 'white' }}>
            <SafeAreaView style={[styles.container, { opacity: modelOpen ? 0.5 : 1, backgroundColor: modelOpen ? '#000000cf' : 'white' }]}>
                <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '700', lineHeight: 28.13 }}>Profile</Text>

                <View style={{ marginTop: 15 }}>
                    <View style={{ width: '90%', margin: 'auto', marginVertical: 10 }}>
                        <Text style={styles.TXTColor}>Name</Text>
                        <TextInput
                            placeholder='Name'
                            style={styles.Input}
                            value="User"
                        />
                    </View>

                    <View style={{ width: '90%', margin: 'auto', marginVertical: 10 }}>
                        <Text style={styles.TXTColor}>Phone Number</Text>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', borderWidth: 1, justifyContent: 'space-between', borderRadius: 10, paddingHorizontal: 10 }}>
                            <TextInput
                                placeholder='Phone Number'
                                style={styles.Inputs}
                            />
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: '500', textDecorationLine: "underline", color: '#01B0ED' }}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ width: '90%', margin: 'auto', marginVertical: 10 }}>
                        <Text style={styles.TXTColor}>Email</Text>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', borderWidth: 1, justifyContent: 'space-between', borderRadius: 10, paddingHorizontal: 10 }}>
                            <TextInput
                                placeholder='Email'
                                style={styles.Inputs}
                            />
                            <TouchableOpacity>
                                <Text style={{ fontSize: 10, fontWeight: '500', textDecorationLine: "underline", color: '#01B0ED' }}>Change</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ width: '90%', margin: 'auto', marginVertical: 10 }}>
                        <View style={{ width: '90%', alignSelf: 'flex-end' }}>
                            <TouchableOpacity style={styles.BTN} onPress={() => Emptys()}>
                                <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff' }}>Add new address</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.TXTColor}>Personal Address</Text>
                        </View>
                        <View>
                            {
                                personalAdress.length ? (
                                    personalAdress.map((el: any, inx: any) => {
                                        return (
                                            <View key={inx}>
                                                {
                                                    inx === 0 && el.default ? (
                                                        <View style={{ width: '100%', borderWidth: 1, justifyContent: 'space-between', borderRadius: 10, paddingHorizontal: 10, marginVertical: 10 }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                            <View>
                                                                <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 2 }}>{el.fullName}</Text>
                                                                <Text style={{ fontSize: 10, fontWeight: '500', marginVertical: 2 }}>{el.mobileNo}</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                                                <TouchableOpacity onPress={() => EditAddress(el,inx)}>
                                                                    <Text style={{ fontSize: 10, fontWeight: '500', textDecorationLine: "underline", color: '#01B0ED' }}>Edit</Text>
                                                                </TouchableOpacity>
        
                                                                <TouchableOpacity onPress={() => Deletes(el)}>
                                                                    <Image source={require('../assets/images/Delete.png')} style={{ width: 14, height: 16.09 }} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <Text>{el.houseNo},{el.addressLine}, {el.area}, {el.city}, {el.state}, {el.pincode}</Text>
                                                            <Text style={{textAlign:'right',opacity:0.5,fontWeight:'500'}}>Default</Text>
                                                        </View>
                                                    </View>
                                                    ) : (
                                                        <View style={{ width: '100%', borderWidth: 1, justifyContent: 'space-between', borderRadius: 10, paddingHorizontal: 10, marginVertical: 10 }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                            <View>
                                                                <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 2 }}>{el.fullName}</Text>
                                                                <Text style={{ fontSize: 10, fontWeight: '500', marginVertical: 2 }}>{el.mobileNo}</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                                                <TouchableOpacity onPress={() => EditAddress(el,inx)}>
                                                                    <Text style={{ fontSize: 10, fontWeight: '500', textDecorationLine: "underline", color: '#01B0ED' }}>Edit</Text>
                                                                </TouchableOpacity>
        
                                                                <TouchableOpacity onPress={() => Deletes(el)}>
                                                                    <Image source={require('../assets/images/Delete.png')} style={{ width: 14, height: 16.09 }} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <Text>{el.houseNo},{el.addressLine}, {el.area}, {el.city}, {el.state}, {el.pincode}</Text>
                                                            <Text></Text>
                                                        </View>
                                                    </View>
                                                    )
                                                }
                                            </View>
                                        )
                                    })) : (
                                    <View style={{ width: '100%', borderWidth: 1, justifyContent: 'space-between', borderRadius: 10, paddingHorizontal: 10, marginVertical: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                            <View>
                                                <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 2 }}>Name</Text>
                                                <Text style={{ fontSize: 10, fontWeight: '500', marginVertical: 2 }}>mobileNo</Text>
                                            </View>
                                            <TouchableOpacity>
                                                <Text style={{ fontSize: 10, fontWeight: '500', textDecorationLine: "underline", color: '#01B0ED' }}>Edit</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text>Address not found</Text>
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                    </View>

                    <View style={{ width: '90%', margin: 'auto', marginVertical: 10 }}>
                        <Text style={styles.TXTColor}>Business Address</Text>
                        <View style={{ width: '100%', borderWidth: 1, justifyContent: 'space-between', borderRadius: 10, paddingHorizontal: 10, marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <View>
                                    <Text style={{ fontWeight: '700', fontSize: 14, marginVertical: 2 }}>{Business?.bussinessTitle}</Text>
                                    <Text style={{ fontSize: 10, fontWeight: '500', marginVertical: 2 }}>{Business?.mobileNo}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => BuinesAddresssUpdate()}>
                                        <Text style={{ fontSize: 10, fontWeight: '500', textDecorationLine: "underline", color: '#01B0ED' }}>Edit</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Text>{Business.houseNo} {Business.addressLine} {Business.area} {Business.city} {Business.state} {Business.pincode}</Text>
                            </View>
                                <Text style={{textAlign:'right',opacity:0.5,fontWeight:'500'}}>Default</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modelOpen}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModelOpen(!modelOpen);
                        }}>

                        <View style={styles.centeredView}>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: '10%' }}>
                                <View style={[styles.modalView, { width: width - 20, }]}>
                                    <Text style={styles.modalText}>Address</Text>
                                    <TouchableOpacity style={{ alignSelf: 'flex-end', position: 'relative', bottom: 20 }} onPress={() => {setModelOpen(false),setdefault(false)}}>
                                        <AntDesign name="closecircle" size={30} color="black" />
                                    </TouchableOpacity>
                                    <View style={{ position: 'relative', top: -30 }}>
                                        <View style={styles.InputsMain}>
                                            <Text style={styles.Text}>Full Name</Text>
                                            <TextInput
                                                placeholder="Name"
                                                style={{ borderWidth: 1, borderRadius: 5, paddingLeft: 10, width: '100%' }}
                                                value={name}
                                                onChangeText={setName}
                                            />
                                        </View>

                                        <View style={styles.InputsMain}>
                                            <Text style={styles.Text}>Phone Number</Text>
                                            <TextInput
                                                placeholder="Phone Number"
                                                keyboardType="number-pad"
                                                maxLength={editModal ? 13 : 10}
                                                style={{ borderWidth: 1, borderRadius: 5, paddingLeft: 10, width: '100%' }}
                                                value={number}
                                                onChangeText={setNumber}
                                            />
                                        </View>

                                        <View style={{ flexDirection: 'row', width: '95%', marginHorizontal: 'auto', justifyContent: 'space-between' }}>
                                            <View style={{ width: '100%' }}>
                                                <Text style={styles.Text}>Home/Appt</Text>
                                                <TextInput
                                                    placeholder="Home/Appt"
                                                    style={{ borderWidth: 1, borderRadius: 5, paddingLeft: 10, width: '100%' }}
                                                    onChangeText={setHome}
                                                    value={home}
                                                />
                                            </View>


                                        </View>
                                        <View style={styles.InputsMain}>
                                            <Text style={styles.Text}>Address</Text>
                                            <TextInput
                                                placeholder="Address"
                                                style={{ borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                                                value={Address}
                                                onChangeText={setAddress}
                                            />
                                        </View>


                                        <View style={{ flexDirection: 'row', width: '95%', marginHorizontal: 'auto', justifyContent: 'space-between', marginTop: 10 }}>
                                            <View style={{ width: '45%' }}>
                                                <Text style={styles.Text}>City</Text>
                                                <TextInput
                                                    placeholder="City"
                                                    style={{ borderWidth: 1, borderRadius: 5, paddingLeft: 10, width: '100%' }}
                                                    value={citys}
                                                    onChangeText={setCity}

                                                />
                                            </View>

                                            <View style={{ width: '45%' }}>
                                                <Text style={styles.Text}>Pincode</Text>
                                                <TextInput
                                                    placeholder="Pincode"
                                                    keyboardType="number-pad"
                                                    style={{ borderWidth: 1, borderRadius: 5, paddingLeft: 10, width: '100%' }}
                                                    value={pipncode}
                                                    onChangeText={setpincode}
                                                />
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row', width: '95%', marginHorizontal: 'auto', justifyContent: 'space-between' }}>
                                            <View style={{ width: '45%' }}>
                                                <Text style={styles.Text}>State</Text>
                                                <TextInput
                                                    placeholder="State"
                                                    style={{ borderWidth: 1, borderRadius: 5, paddingLeft: 10, width: '100%' }}
                                                    value={states}
                                                    onChangeText={setState}
                                                />
                                            </View>
                                            <View style={{ width: '45%' }}>
                                                <Text style={styles.Text}>Area</Text>
                                                <TextInput
                                                    placeholder="Area"
                                                    style={{ borderWidth: 1, borderRadius: 5, paddingLeft: 10, width: '100%' }}
                                                    onChangeText={setArea}
                                                    value={Area}
                                                />
                                            </View>


                                        </View>

                                        <View>
                                            {
                                                GST ? (
                                                    <View style={styles.InputsMain}>
                                                        <Text style={styles.Text}>GST No.</Text>
                                                        <TextInput
                                                            placeholder="GST"
                                                            style={{ borderWidth: 1, borderRadius: 5, paddingLeft: 10 }}
                                                            value={Address}
                                                            onChangeText={setAddress}
                                                        />
                                                    </View>
                                                ) : (
                                                    ''
                                                )
                                            }
                                        </View>
                                            {
                                                defaults ? (
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, width: '95%', marginHorizontal: 'auto' }}>

                                                    <Checkbox
                                                        value={checkDefault}
                                                        onValueChange={setCheckdefaults}
                                                        style={styles.checkbox}
                                                    />
                                                    <Text>Save as Default</Text>
                                                </View>
                                                ) : ('')
                                            }
                                        <TouchableOpacity style={styles.BTNADD} onPress={() => SaveAddAdress()}>
                                            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '600', color: 'white', }}>Save Address</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#fff'
    },
    Input: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#FCFBF880',
        paddingLeft: 15,
        fontSize: 16,
        fontWeight: '400'
    },
    Inputs: {
        fontSize: 16,
        fontWeight: '400',
        width: '85%',

    },
    TXTColor: {
        fontSize: 18,
        fontWeight: '500',
        color: '#FF1276',
        marginVertical: 2
    },
    BTN: {
        width: 145,
        height: 25,
        borderRadius: 5,
        backgroundColor: '#FF1276',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        paddingHorizontal: 15,
        paddingTop: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center'
    },
    Text: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 5
    },
    InputsMain: {
        marginVertical: 2,
        width: '95%',
        marginHorizontal: 'auto'
    },
    checkbox: {
        borderRadius: 5,
    },
    BTNADD: {
        backgroundColor: '#FF1276',
        paddingVertical: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: '95%',
        marginHorizontal: 'auto'
    }
})