import {setSingleCompany} from '@/redux/companySlice';
import { useEffect } from 'react'
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import {useDispatch} from 'react-redux';
const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
  useEffect(()=>{
    const fetchSingleCompany = async ()=>{
          try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true})
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company))
            }
          } catch (error) {
            console.log(error)
          }
    }
    fetchSingleCompany()
  },[companyId,dispatch])
}

export default useGetCompanyById;
