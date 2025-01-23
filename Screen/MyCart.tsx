import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartRemoveDelete } from "@/app/ApiService";
import Loader from "./Loader";
import { CartContext } from "@/contexts/CartContext";
import { useSelector } from "react-redux";

export default function MyCart() {
  const {GetCartRecords} = useContext<any>(CartContext)
  const {cartItems} = useSelector(state => state.cart)
  console.log("data", cartItems)
  const { navigate, goBack } = useNavigation<any>();
  const [ShowcartItems, setAllShowCart] = useState([])
  const [TotalPrice, setTotalPrice] = useState<any>('');
  const [Discount, setDiscounted] = useState<any>('')
  const [countityArray,setCountityArray] = useState<any []>([])
  const [isLoading, setLoading] = useState(true);
  const focused = useIsFocused();
  const height = Dimensions.get('window').height;
  const width = Dimensions.get('window').width;
  useEffect(() => {
    AllGetCatedSave();
  }, [focused]);

  const AllGetCatedSave = async () => {
    let sum: any = 0;
    let discount: any = 0;
    try {
      setCountityArray(Array(cartItems.length).fill(1))
      cartItems.forEach((el: any) => {
        discount += el.product.discountedPrice;
        sum += el.product.price
      })
      setTotalPrice(sum)
      setDiscounted(discount)
      
    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const DeleteCartRemove = async (id: string) => {
    try {
      let data = await CartRemoveDelete(id);
      GetCartRecords()
      AllGetCatedSave();
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


  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: '700', textAlign: 'center', padding: 15 }}>My Cart</Text>
      <View style={{ flex: 1 }}>
        {
          isLoading ? (
            <Loader />
          ) : (
            <SafeAreaView style={styles.container}>
              <ScrollView>

              {
                cartItems.length ? (
                  <View style={{ flex: 1, padding: 15, gap: 10 }}>
                    {

                      cartItems.map((el, inx) => {
                        return (
                          <Pressable style={styles.Products} key={inx} onPress={()=>navigate('ProductDetails', { data: el.product })}>
                            <View>
                              <View style={{ width: 65, height: 70, backgroundColor: '#e0dddd', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity>
                                  <Image source={require('../assets/images/Prod1.png')} style={{ width: 57, height: 36.5 }} />
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={{ width: '80%', justifyContent: 'space-between', paddingBottom: 4 }}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', width: '95%', justifyContent: 'space-between' }}>
                                <Text>{String(el?.product?.name.slice(0,50))}...</Text>
                                <TouchableOpacity onPress={() => DeleteCartRemove(el?.product?._id)} style={{marginHorizontal:5}}>
                                  <Image source={require('../assets/images/Delete.png')} style={{ width: 14, height: 16.09 }} />
                                </TouchableOpacity>
                              </View>

                              <View style={{ flexDirection: 'row', alignItems: 'center', width: '70%', }}>
                                <View style={{ flexDirection: 'row', width: '99%', alignItems: 'center', gap: 5 }}>
                                  <Text style={{ color: '#01B0ED', fontSize: 14, fontWeight: '500' }}>₹{el?.product.price}</Text>
                                  <Text style={{ fontSize: 10, fontWeight: '500', opacity: 0.5, textDecorationLine: 'line-through', }}>₹{el.product.discountedPrice}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                  <TouchableOpacity style={styles.Decrement} onPress={()=>DecrementCalculation(el,inx)}>
                                    <View style={{ backgroundColor: '#FF1276', width: 10, height: 3 }}></View>
                                  </TouchableOpacity>
                                  <Text style={{ fontSize: 14, fontWeight: '600' }}>{countityArray[inx]}</Text>
                                  <TouchableOpacity style={[styles.Decrement, { backgroundColor: '#FF1276', borderWidth: 0 }]} onPress={()=>CalculatePriceMultiplication(el,inx)}>
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
                ) : (
                  <SafeAreaView style={styles.container}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                      <View style={styles.Box}>
                        <View style={{ alignItems: 'center', marginTop: 50 }}>
                          <Image source={require('../assets/images/CartibgBox.png')} style={{ width: 185, height: 184.55, }} />
                        </View>
                        <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 24, fontWeight: '700' }}>Your cart is empty.</Text>
                        <Text style={{ fontSize: 12, fontWeight: '500', textAlign: 'center', opacity: 0.5, marginTop: 5 }}>You have no items in your cart.</Text>
                      </View>
                      <View>
                        <TouchableOpacity style={styles.PinkCircle} onPress={() => navigate('Home')}>
                          <Image source={require('../assets/images/Plus.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </SafeAreaView>
                )
              }
              </ScrollView>

              <View>
                <View style={styles.BottomPopup}>
                  <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontWeight: '700', fontSize: 18 }}>Order Total</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                      <Text style={{ fontWeight: '700', fontSize: 18 }}>₹{TotalPrice }</Text>
                      <Text style={{ fontSize: 12, fontWeight: '500', opacity: 0.5, textDecorationLine: 'line-through', marginTop: 5 }}>₹{Discount}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.BTN} onPress={()=>navigate('CheckOut')}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff', textAlign: 'center' }}>Checkout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          )
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
  },
  Box: {
    height: 395,
    borderRadius: 10,
    backgroundColor: '#FEFDFC',
    shadowColor: '#00000040',
  },
  PinkCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#FF1276',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 40
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

  },
  Decrement: {
    width: 20,
    height: 20,
    borderWidth: 0.3,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  BottomPopup: {
    width: '100%',
    height: 130,
    shadowColor: '#00000040',
    shadowRadius: 20,
    borderTopWidth: 0.1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    paddingHorizontal: '10%',
    paddingVertical: 15
  },
  BTN: {
    backgroundColor: '#FF1276',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10
  }
})