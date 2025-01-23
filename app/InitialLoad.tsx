import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AllGetCart } from './ApiService'
import { setCartItems } from '@/store/slices/cartSlice'

const InitialLoad = ({ children }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        GetCartRecords()
    }, [])

    const GetCartRecords = async () => {
        try {
            const data = await AllGetCart();
            // setAllCart(data.items)
            dispatch(setCartItems(data.items))
        } catch (error) {
            console.log('Error fetching products:', error);
        }
    }

    return children
}

export default InitialLoad
