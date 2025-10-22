import {setAllJobs} from '@/redux/jobSlice';
import { useEffect } from 'react'
import axios from "../api/axios";
import {JOB_API_END_POINT } from '../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedquery} = useSelector(store=>store.job)
  useEffect(()=>{
    const fetchAllJobs = async ()=>{
          try {
            const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedquery}`,{withCredentials:true})
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs))
            }
          } catch (error) {
            console.log(error)
          }
    }
    fetchAllJobs()
  },[])
}

export default useGetAllJobs
