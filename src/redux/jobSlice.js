import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name : "job",
    initialState :{
        alljobs : [],
        alladminjobs :[],
        searchjobbytext : "",
         allappliedjobs : [],
        singlejob : null,
        searchedquery :""
    },
    reducers :{
        setAllJobs : (state,actions)=>{
        state.alljobs = actions.payload
        },
        setSingleJob: (state,actions) =>{
            state.singlejob = actions.payload
        }, 
        setAllAdminJobs :(state,action)=>{
            state.alladminjobs = action.payload
        },
        setSearchJObByText :(state,action) =>{
            state.searchjobbytext = action.payload
        },
        setAllAppliedJobs :(state,action)=>{
            state.allappliedjobs = action.payload
        },
        setSearchedQuery :(state,action)=>{
            state.searchedquery = action.payload
        }
        
    }
})

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJObByText,
    setSearchedQuery,
    setAllAppliedJobs,
} = jobSlice.actions
export default jobSlice.reducer