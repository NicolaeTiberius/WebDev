import { SelllerContext } from "../context/SellerContext";
import { useContext } from "react";

export const useSellersContext = () => {
    const context = useContext(SelllerContext)

    if(!context){
        throw Error('useSellerContext must be used inside an SellerContextProvider')
    }

    return context
}