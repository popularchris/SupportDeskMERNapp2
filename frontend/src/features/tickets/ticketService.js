import axios from "axios";
import { createNote } from "./ticketSlice";
 
const API_URL='/api/tickets/'

const createTicket=async(ticketData,token)=>{
    const config={
        headers:{
        authorization:`Bearer ${token}`
    }
    }
    const response =await axios.post(API_URL,ticketData,config)
     return response.data
}
const getTickets=async(token)=>{
    const config={
        headers:{
        authorization:`Bearer ${token}`
    }
    }
    const response =await axios.get(API_URL,config)
    return response.data
}
const getTicket=async(ticketId,token)=>{
    const config={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response =await axios.get(API_URL + ticketId,config)
    console.log(response)
     return response.data
}
const closeTicket=async(ticketId,token)=>{
    const config={
        headers:{
            authorization:`Bearer ${token}`
        }
    }
    const response =await axios.put(API_URL + ticketId,{status:'closed'},config)
    console.log(response)
     return response.data
}
// const getNotes=async(token)=>{
//     const config={
//         headers:{
//         authorization:`Bearer ${token}`
//     }
//     }
//     const response =await axios.get(API_URL ,config)
//      return response.data
// }
// const createNote=async(NoteData,token)=>{
//     const config={
//         headers:{
//         authorization:`Bearer ${token}`
//     }
//     }
//     const response =await axios.get(API_URL ,config)
//      return response.data
// }

const ticketService={
    createTicket,
    getTickets,
    getTicket,
    closeTicket
}
export default ticketService