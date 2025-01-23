import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function Modals() {
  const Calling = () => {
    showMessage({
      message: "Success",
      description: "successfully address added !  ",
      type: "success",
    });
  };
  return (
    <View style={{flex:1}}>
    <TouchableOpacity onPress={Calling}>
      <Text>Success</Text>
    </TouchableOpacity>
    <FlashMessage position="bottom" />
  </View>
  )
}