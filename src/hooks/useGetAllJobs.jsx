import {setAllJobs} from '@/redux/jobSlice';
import { useEffect } from 'react'
import axios from "axios";
import {JOB_API_END_POINT } from '../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
const useGetAllJobs = () => {
    const dispatch = useDispatch();
    const {searchedquery} = useSelector(store=>store.job)
     //const { token } = useSelector((store) => store.auth); // Assuming token is stored in authSlice
  useEffect(()=>{
    const fetchAllJobs = async ()=>{
       //if (!token) {
        //console.log("No token found");
       // return; // Optionally handle this case if token is required
      //}
          try {
            const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedquery}`
              ,{withCredentials:true
              })
            if(res.data.success){
                dispatch(setAllJobs(res.data.jobs))
            }
          } catch (error) {
            console.log(error)
          }
    }
    fetchAllJobs()
  },[searchedquery,dispatch])
}

export default useGetAllJobs
//,headers:{'Authorization': `Bearer ${token}`,}