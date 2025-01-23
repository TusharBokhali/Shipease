import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable, ScrollView, TextInput, Dimensions } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RadioButton } from 'react-native-paper';
import { AllGetCart, CartRemoveDelete, GetAllAddress } from '@/app/ApiService';

export default function CheckOut() {
    const { navigate, goBack } = useNavigation<any>()
    const [selectedId, setSelectedId] = useState<any>('first');
    const [Address, setAddress] = useState<any[]>([]);
    const [Allcart, setAllcart] = useState<any[]>([])
    const [TotalPrice, setTotalPrice] = useState<any>('');
    const [Discount, setDiscounted] = useState<any>('')
    const [countityArray, setCountityArray] = useState<any[]>([]);
    const [isLoading,setLoading] = useState<boolean>(true);
    const [TotalItem,setTotalItem] = useState(0);
    const Focused = useIsFocused();

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    useEffect(() => {
        GetMainAddress();
        GetAllCart();
    }, [Focused])

    const GetMainAddress = async () => {
        try {
            let data = await GetAllAddress();
        } catch (error) {
            console.log(error);
        }
    }

    const GetAllCart = async () => {
      let sum: any = 0;
      let discount: any = 0;
      try {
        const data = await AllGetCart();
        setCountityArray(Array(data.items.length).fill(1))
        data.items.forEach((el: any) => {
          discount += el.product.discountedPrice;
          sum += el.product.price
        })
        setTotalPrice(sum)
        setDiscounted(discount)
        setAllcart(data.items)
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally{
        setLoading(false)
      }
    }

     const DeleteCartRemove = async (id: string) => {
        try {
          let data = await CartRemoveDelete(id);
          GetAllCart();
        } catch (error) {
          console.log(error);
        }
      }
    
      let arrays = [...countityArray];
      const CalculatePriceMultiplication = (el:any,inx:any) =>{
        arrays[inx] = arrays[inx]+1;
        setTotalPrice(TotalPrice + el.product.price)
        setCountityArray(arrays)
        setDiscounted(Discount + el.product.discountedPrice)
      }
    
      const DecrementCalculation = (el:any,inx:any) =>{
       if(countityArray[inx] > 1){
        arrays[inx] = arrays[inx]-1;
        setTotalPrice(TotalPrice - el.product.price)
        setCountityArray(arrays)
        setDiscounted(Discount - el.product.discountedPrice)
       }
      }
      let total = 0;
      countityArray.forEach((el)=>{
            return total+=el;
      })
    
      
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{paddingBottom:50,padding:15}}>
            <TouchableOpacity onPress={() => goBack()}>
                <Image source={require('../assets/images/BackButton.png')} style={{ width: 10, height: 17.28 }} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 24 }}>CheckOut</Text>
            <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 20 }}>Shipping Details</Text>
            <View style={styles.AllAdreMain}>
                <View style={[styles.Address, { borderColor: selectedId == 'first' ? '#FF1276' : '#FEFDFC',width:width * 0.45  }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <View>
                                <RadioButton
                                    value="first"
                                    status={selectedId === 'first' ? 'checked' : 'unchecked'}
                                    onPress={() => setSelectedId('first')}
                                    color='#FF1276'
                                />
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: '700' }}>Home</Text>
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: '500', textDecorationLine: 'underline', color: '#01B0ED' }}>Edit</Text>
                    </View>
                    <Text style={{ marginLeft: 10, textAlign: 'justify', fontSize: 10, fontWeight: '400' }}>240, GR Floor Nanived gam, Ved road, Katargam, Surat, Gujrat. 395004</Text>
                    <View style={{ marginLeft: 10, marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 10, fontWeight: '500' }}>Aryan Patel</Text>
                        <Text style={{ fontSize: 10, fontWeight: '500' }}>8780753592</Text>
                    </View>
                </View>

                <View style={[styles.Address, { borderColor: selectedId == 'second' ? '#FF1276' : '#FEFDFC',width:width * 0.45  }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <View>
                                <RadioButton
                                    value="first"
                                    status={selectedId === 'second' ? 'checked' : 'unchecked'}
                                    onPress={() => setSelectedId('second')}
                                    color='#FF1276'
                                />
                            </View>
                            <Text style={{ fontSize: 14, fontWeight: '700' }}>Office</Text>
                        </View>
                        <Text style={{ fontSize: 12, fontWeight: '500', textDecorationLine: 'underline', color: '#01B0ED' }}>Edit</Text>
                    </View>
                    <Text style={{ marginLeft: 10, textAlign: 'justify', fontSize: 10, fontWeight: '400' }}>240, GR Floor Nanived gam, Ved road, Katargam, Surat, Gujrat. 395004</Text>
                    <View style={{ marginLeft: 10, marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 10, fontWeight: '500' }}>Aryan Patel</Text>
                        <Text style={{ fontSize: 10, fontWeight: '500' }}>8780753592</Text>
                    </View>
                </View>
            </View>
            <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 10 }}>Order List</Text>
            <View style={{marginTop:10}}>
                {
                    
                        Allcart.map((el, inx) => {
                            return (
                                <Pressable style={styles.Products} key={inx} onPress={() => navigate('ProductDetails', { data: el.product })}>
                                    <View>
                                        <View style={{ width: 65, height: 70, backgroundColor: '#e0dddd', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                            <TouchableOpacity>
                                                <Image source={require('../assets/images/Prod1.png')} style={{ width: 57, height: 36.5 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ width: '80%', justifyContent: 'space-between', paddingBottom: 4 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '95%', justifyContent: 'space-between' }}>
                                            <Text>{String(el?.product?.name.slice(0, 50))}...</Text>
                                            <TouchableOpacity onPress={() => DeleteCartRemove(el?.product?._id)} style={{ marginHorizontal: 5 }}>
                                                <Image source={require('../assets/images/Delete.png')} style={{ width: 14, height: 16.09 }} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'space-between',paddingRight:width <400 ? 10 : 0 }}>
                                            <View style={{ flexDirection: 'row', width: '99%', alignItems: 'center', gap: 5 }}>
                                                <Text style={{ color: '#01B0ED', fontSize: 14, fontWeight: '500' }}>₹{el?.product.price}</Text>
                                                <Text style={{ fontSize: 10, fontWeight: '500', opacity: 0.5, textDecorationLine: 'line-through', }}>₹{el.product.discountedPrice}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                                <TouchableOpacity style={styles.Decrement} onPress={() => DecrementCalculation(el, inx)}>
                                                    <View style={{ backgroundColor: '#FF1276', width: 10, height: 3 }}></View>
                                                </TouchableOpacity>
                                                <Text style={{ fontSize: 14, fontWeight: '600' }}>{countityArray[inx]}</Text>
                                                <TouchableOpacity style={[styles.Decrement, { backgroundColor: '#FF1276', borderWidth: 0 }]} onPress={() => CalculatePriceMultiplication(el, inx)}>
                                                    <Image source={require('../assets/images/Plus.png')} style={{ width: 12, height: 12 }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        })
                }
            </View>
            <View style={styles.FinalPriceBox}>
                <Text style={{fontSize:18,fontWeight:'600'}}>Order Details</Text>
                <View style={{width:'80%',margin:'auto',flexDirection:'row',justifyContent:'space-between',marginVertical:2}}>
                    <Text style={{fontSize:14,fontWeight:'500'}}>Price {`(${total} items)`}</Text>
                    <Text style={{fontSize:16,fontWeight:'500'}}>₹{TotalPrice}</Text>
                </View>

                 <View style={{width:'80%',margin:'auto',flexDirection:'row',justifyContent:'space-between',marginVertical:2}}>
                    <Text style={{fontSize:14,fontWeight:'500'}}>Delivery</Text>
                    <Text style={{fontSize:16,fontWeight:'500'}}>₹120</Text>
                </View>

                <View style={{width:'80%',margin:'auto',flexDirection:'row',justifyContent:'space-between',marginVertical:2}}>
                    <Text style={{fontSize:14,fontWeight:'500'}}>Discount</Text>
                    <Text style={{fontSize:16,fontWeight:'500'}}>- ₹{Discount}</Text>
                </View>
                <View style={{width:'80%',margin:'auto',flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                    <Text style={{fontSize:18,fontWeight:'700'}}>Order Total</Text>
                    <Text style={{fontSize:18,fontWeight:'700'}}>₹{TotalPrice + 120}</Text>
                </View>
            </View>
            <View style={styles.Cupen}>
                <TextInput 
                style={{width:'55%',backgroundColor:'#CCCCCC',borderRadius:3,fontSize:10,}}
                />
                <Text style={{fontSize:10,color:'#01B0ED',fontWeight:'500'}}>Add Gift Card or Promo Code</Text>
            </View>
            </ScrollView>
            <View style={styles.Fixed}>
                <View style={{flexDirection:'row',width:'80%',margin:'auto',justifyContent:'space-between',marginTop:10}}>
                    <Text style={{fontSize:18,fontWeight:'700'}}>Order Total</Text>
                    <View style={{flexDirection:'row',alignItems:'center',gap:5}}>
                        <Text style={{fontSize:18,fontWeight:'700'}}>₹{TotalPrice + 120}</Text>
                        <Text style={{marginTop:5,textDecorationLine:'line-through',opacity:0.5,fontSize:12,fontWeight:'500'}}>₹{Discount}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.BTN} onPress={()=>navigate('Payments', {totalprice: TotalPrice+120,discount:Discount})}>
                    <Text style={{textAlign:'center',color:'white',fontSize:16,fontWeight:'600'}}>Place Order</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 15,
        backgroundColor:'white'
    },
    AllAdreMain: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20
    },
    Address: {
        // width: 160,
        paddingVertical: 5,
        backgroundColor: 'white',
        paddingHorizontal: 8,
        borderWidth: 1.5,
        borderRadius: 7,
        elevation: 2
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
        marginVertical:5
      },
      Decrement: {
        width: 20,
        height: 20,
        borderWidth: 0.3,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
      },
      FinalPriceBox:{
        borderWidth:0.5,
        borderColor:'#00000040',    
        paddingHorizontal:10,
        paddingVertical:5,
        marginTop:5,
        borderRadius:7,
        elevation:2,
        backgroundColor:'white'
      },
      Cupen:{
        borderRadius:7,
        elevation:15,
        backgroundColor:'white',
        borderWidth:0.5,
        paddingHorizontal:10,
        paddingVertical:5,
        marginVertical:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:50
      },
      Fixed:{
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderWidth:0.5,
        padding:10,
      },
      BTN:{
        width:'80%',
        backgroundColor:'#FF1276',
        margin:'auto',
        paddingVertical:10,
        borderRadius:10,
        marginTop:20,
        marginBottom:10
      }
})