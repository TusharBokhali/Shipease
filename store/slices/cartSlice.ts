import { createSlice } from '@reduxjs/toolkit'

// state, useState
// dispatch, selector

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    setCartItems: (state, {payload}) => {
        state.cartItems = payload
    },
  }
})

// Action creators are generated for each case reducer function
export const { setCartItems } = cartSlice.actions

export default cartSlice.reducer


// setCartItems(data)