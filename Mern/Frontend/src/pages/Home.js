import React from 'react'
import { useEffect } from 'react'

//components
import SellerDetails from '../components/SellerDetails'
import SellerForm from '../components/SellerForm'

//hooks
import {useSellersContext} from '../hooks/useSellersContext'


const Home = () => {
    // const [sellers, setSellers] = useState(null)
    const {sellers,dispatch} = useSellersContext()

    useEffect(()=>{
        document.title = "Home | Sellers"
        const fetchSellers = async () => {
            const response = await fetch('/api/sellers')
            const json = await response.json()

            if(response.ok){
                // setSellers(json)
                dispatch({type: 'SET_SELLERS',payload: json})
            }
        }

        fetchSellers()
    },[dispatch])

  return (
   
    <div className='home'>
        <title>Home | Sellers</title>
        <div className='sellers'>
            {sellers && sellers.map((seller)=>(
                <SellerDetails key={seller._id} seller={seller}/>
            ))}
        </div>    
        <SellerForm/>
    </div>
  )
}

export default Home