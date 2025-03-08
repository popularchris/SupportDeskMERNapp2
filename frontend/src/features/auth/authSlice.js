import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
const initialState={
    message:'',
    isloading:false,
    isSuccess:false,
    isError:false,
    user:null

}
export const authSlice=createSlice({
name:'auth',
initialState,
reducers:{
  reset:(state)=>{
    state.isError=false
    state.isloading=false
    state.isSuccess=false
    state.message=''
  }
},
extraReducers:(builder)=>{
    builder.addCase(register.pending,(state)=>{
        state.isloading=true
    })
    .addCase(register.fulfilled,(state,action)=>{
        state.isloading=false
        state.user=action.payload
        state.isSuccess=true
    })
    .addCase(login.rejected,(state,action)=>{
        state.isloading=false
        state.user=null
        state.isSuccess=false
        state.message=action.payload
    })
    .addCase(login.fulfilled,(state,action)=>{
        state.isloading=false
        state.user=action.payload
        state.isSuccess=true
    })
    .addCase(login.pending,(state)=>{
        state.isloading=true
    })
    .addCase(register.rejected,(state,action)=>{
        state.isloading=false
        state.user=null
        state.isSuccess=false
        state.message=action.payload
    })

    .addCase(logout.fulfilled,(state)=>{
        state.user=null
    }  
) 
 .addCase(logout.pending,(state)=>{
    state.isloading=true
}) 
    

},
})
export const register=createAsyncThunk('auth/Register',
    async(user,thunkApi)=>{
try {
    return await authService.register(user)
} catch (error) {

    const message=(
        // eslint-disable-next-line 
        error.response && error.response.data && error.response.data.message || error.message || error .toString() )

        return thunkApi.rejectWithValue(message)
    }
})
    

export const login=createAsyncThunk('auth/login',
     async(user,thunkApi)=>{
        try {
            return await authService.login(user)
        } catch (error) {
        
            const message=(
                // eslint-disable-next-line 
                error.response && error.response.data && error.response.data.message || error.message || error .toString() )
        
                return thunkApi.rejectWithValue(message)
            }
    }
    
)
export const logout =createAsyncThunk('auth/logout',
    async()=>{
        await authService.logout()
   }
)

export const {reset}=authSlice.actions
export default authSlice.reducer