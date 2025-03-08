import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from './ticketService'
const initialState={
    tickets:[],
    ticket:{},
    isloading:false,
    isError:false,
    message:'',
    isSuccess:false
}
export const createTicket=createAsyncThunk('api/tickets',
    async(ticketData,thunkApi)=>{
try {
    const token=thunkApi.getState().auth.user.token
    console.log(ticketData)
    return await ticketService.createTicket(ticketData,token)
} catch (error) {

    const message=(
        // eslint-disable-next-line 
        error.response && error.response.data && error.response.data.message || error.message || error .toString() )

        return thunkApi.rejectWithValue(message)
    }
})

export const getTickets=createAsyncThunk('api/tickets/getAll',
    async(_,thunkApi)=>{
try {
    const token=thunkApi.getState().auth.user.token
    return await ticketService.getTickets(token)
} catch (error) {

    const message=(
        // eslint-disable-next-line 
        error.response && error.response.data && error.response.data.message || error.message || error .toString() )

        return thunkApi.rejectWithValue(message)
    }
})
export const getTicket=createAsyncThunk('api/tickets/get/',
    async(tickedId,thunkApi)=>{
try {
    const token=thunkApi.getState().auth.user.token
    return await ticketService.getTicket(tickedId,token)
} catch (error) {

    const message=(
        // eslint-disable-next-line 
        error.response && error.response.data && error.response.data.message || error.message || error .toString() )

        return thunkApi.rejectWithValue(message)
    }
})

export const closeTicket=createAsyncThunk('api/tickets/closed',
    async(tickedId,thunkApi)=>{
try {
    const token=thunkApi.getState().auth.user.token
    return await ticketService.closeTicket(tickedId,token)
} catch (error) {

    const message=(
        // eslint-disable-next-line 
        error.response && error.response.data && error.response.data.message || error.message || error .toString() )

        return thunkApi.rejectWithValue(message)
    }
})
// export const createNote=createAsyncThunk('api/notes',
//     async(NoteData,thunkApi)=>{
// try {
//     const token=thunkApi.getState().auth.user.token
//     console.log(NoteData)
//     return await ticketService.createNote(NoteData,token)
// } catch (error) {

//     const message=(
//         // eslint-disable-next-line 
//         error.response && error.response.data && error.response.data.message || error.message || error .toString() )

//         return thunkApi.rejectWithValue(message)
//     }
// })
// export const getNotes=createAsyncThunk('api/notes',
//     async(_,thunkApi)=>{
// try {
//     const token=thunkApi.getState().auth.user.token
//     console.log(ticketData)
//     return await ticketService.getNotes(token)
// } catch (error) {

//     const message=(
//         // eslint-disable-next-line 
//         error.response && error.response.data && error.response.data.message || error.message || error .toString() )

//         return thunkApi.rejectWithValue(message)
//     }
// })
export const ticketSlice=createSlice({
    name:'ticket',
    initialState,
    reduscers:{
        reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createTicket.pending,(state)=>{
            state.isloading=true
        })
        .addCase(createTicket.fulfilled,(state)=>{
            state.isloading=false
            state.isSuccess=true
        })
        .addCase(createTicket.rejected,(state,action)=>{
            state.isloading=false
            state.isSuccess=false
            state.error=true
            state.message=action.payload
        })
        .addCase(getTickets.pending,(state)=>{
            state.isloading=true
        })
        .addCase(getTickets.fulfilled,(state,action)=>{
            state.isloading=false
            state.isSuccess=true
            state.tickets=action.payload
        })
        .addCase(getTickets.rejected,(state,action)=>{
            state.isloading=false
            state.isSuccess=false
            state.error=true
            state.message=action.payload
        })
        .addCase(getTicket.pending,(state)=>{
            state.isloading=true
        })
        .addCase(getTicket.fulfilled,(state,action)=>{
            state.isloading=false
            state.isSuccess=true
            state.ticket=action.payload
        })
        .addCase(getTicket.rejected,(state,action)=>{
            state.isloading=false
            state.isSuccess=false
            state.error=true
            state.message=action.payload
        })
        .addCase(closeTicket.pending,(state)=>{
            state.isloading=true
        })
        .addCase(closeTicket.fulfilled,(state,action)=>{
            state.isloading=false
            state.tickets.map((ticket)=>
                ticket._id === action.payload._id ? (ticket.status = 'closed'):ticket
            )
        })

    }

})
export const{reset}=ticketSlice.actions
export default ticketSlice.reducer