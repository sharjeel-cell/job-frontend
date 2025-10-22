//import {setCompanies} from '@/redux/jobSlice';
import { useEffect } from 'react'
import axios from "../api/axios";
import { COMPANY_API_END_POINT } from '../utils/constant';
import {useDispatch} from 'react-redux';
import { setCompanies } from '../redux/companySlice';
const useGetAllCompanies = () => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchCompanies = async ()=>{
          try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true})
            if(res.data.success){
                dispatch(setCompanies(res.data.companies))
            }
          } catch (error) {
            console.log(error)
          }
    }
    fetchCompanies()
  },[])
}

export default useGetAllCompanies;
