import React from 'react'
import { createContext, useReducer } from 'react'

export const SelllerContext = createContext()

export const sellersReducer= (state,action) => {
    switch (action.type) { 
        case 'SET_SELLERS': 
            return {
                sellers: action.payload
            }
        case 'CREATE_SELLER':
            return {
                sellers: [action.payload,...state.sellers]
            }
        case 'DELETE_PRODUCT':
            return {
                sellers: state.sellers.filter((s)=> s._id !== action.payload._id)
            }
        default:
            return state    
    }
}

export const SellerContextProvider = ( { children } ) => {

    const [state,dispatch] = useReducer(sellersReducer,{
        sellers: null
    })


    return (
        <SelllerContext.Provider value={{...state,dispatch}}>
            { children }
        </SelllerContext.Provider>
    )
}