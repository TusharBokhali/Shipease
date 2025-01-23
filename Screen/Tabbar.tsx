import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from "./Home";
import Wishlist from "./Wishlist";
import MyCart from "./MyCart";
import Notification from "./Notification";
import Profile from "./Profile";
import { Image } from "react-native";
import * as Svg from 'react-native-svg';
import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
export default function Tabbar(){
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator initialRouteName='Home' screenOptions={{
            headerShown:false,
            tabBarHideOnKeyboard: true,
            tabBarStyle:{
                position:'absolute',
                height:60,
                borderTopLeftRadius:10,
                borderTopRightRadius:10,
            },
            tabBarIconStyle:{
                color:'#FF1276'
            },
            tabBarActiveTintColor: '#FF1276',
            tabBarInactiveTintColor:'#08465B'
            
            }}>
            <Tab.Screen name="Home" component={Home} 
             options={{
                tabBarIcon:({color,size})=>(
                    <MaterialIcons name="home" size={30} color={color} />
                ),                
            }}
            />
            <Tab.Screen name="Wishlist" component={Wishlist} 
            options={{
                tabBarIcon:({color,})=>(
                    <AntDesign name="heart" size={24} color={color} />
                )
            }}
            />
            <Tab.Screen name="MyCart" component={MyCart} 
            options={{
                tabBarIcon:({color,})=>(
                    <MaterialCommunityIcons name="cart-variant" size={24} color={color} />
                )
            }}
            />
            <Tab.Screen name="Notification" component={Notification} 
              options={{
                tabBarIcon:({color,})=>(
                    <Ionicons name="notifications" size={24} color={color} />
                )
            }}
            />
            <Tab.Screen name="Profile" component={Profile} 
             options={{
                tabBarIcon:({color,})=>(
                    <FontAwesome5 name="user-alt" size={24} color={color} />
                ),
               
            }}
            />
        </Tab.Navigator>
    )
}