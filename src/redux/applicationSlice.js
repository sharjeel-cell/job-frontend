import { createSlice } from "@reduxjs/toolkit";
 
const applicationSlice = createSlice({
    name : 'applicaion',
    initialState:{
        applicants : []
    },
    reducers :{
        setAllApplicants : (state,action)=>{
            state.applicants = action.payload
        }
    }
})
export const {setAllApplicants} = applicationSlice.actions
export default applicationSlice.reducer