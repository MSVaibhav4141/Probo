import axios from 'axios'
import { error } from 'console'
import { create } from 'zustand'

interface IPlaceOrder {
    eventId: string,
    price: number ,
    type: string,
    side : string,
    qty: number
}

const server_url = process.env.NEXT_PUBLIC_SERVER_ENDPOINT
console.log(server_url)
interface ProboStore{
    balance: number
    error:string | null,
    loading:boolean,
    orderLoading: boolean
    orderError: string | null
    getBalance: (id:string) => Promise<number | any>
    placeOrder: ({eventId, price, type , side , qty}: IPlaceOrder) => Promise<string >
}
const useProboStore = create<ProboStore>()((set) => {
    return{
        balance : 0,
        loading: false,
        error:null,
        orderLoading: false,
        orderError:null,
        getBalance: async(id) => {
            try{
                set({loading:true})
                const result =  await axios.get<{balance:number}>(`${server_url}/get/balance/${id}`)
                const balanace = result.data.balance
                set({balance: balanace})
                set({loading:false})
                return balanace
            }catch(e:any){
                set({error:e.message})
            }
        }, 
        placeOrder: async({ eventId, price, type, side, qty }) => {
            set({orderLoading: true})
            try{
            const {data} = await axios.post(`${server_url}/initiate/order`, {
                eventId,
                price,
                type,
                side,
                qty
            }, {
                headers:{
                    'Content-Type': 'application/json',
                    Authorization : ''
                }
            })

            set({orderLoading: false})
            return data;
            }catch(e:any){
                set({orderError:e.message})
            }
           
        }
    }
})

export default useProboStore;