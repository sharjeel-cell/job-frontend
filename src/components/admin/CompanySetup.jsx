import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Frown, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import axios from "../api/axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useNavigate, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";
const CompanySetup = () => {
  const params = useParams()
  useGetCompanyById(params.id)
    const [input,setInput] = useState({
        name :'',
        description :"",
        website:'',
        location :"",
        logo : null
    });
    const {singleCompany} = useSelector(Store=>Store.company)
    const [loading,setLoding] = useState(false);
    //console.log("params",params)
    const navigate = useNavigate();
    const changeEventHandler = (e)=>{
      setInput({...input,[e.target.name] : e.target.value})
    }
    const changeFileHandler =(e)=>{
         const file = e.target.files?.[0]
         setInput({...input,file})
    }    
    const submitHandler = async (e)=>{
        e.preventDefault();
        const fromData = new FormData();
        fromData.append("name",input.name),
        fromData.append("description",input.description),
        fromData.append("website",input.website),
        fromData.append("location",input.location)
        if(input.file){
          fromData.append("file",input.file)
        }
        try {
          setLoding(true)
           const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`,fromData,{
            headers:{
              "Content-Type" : "multipart/form-data"
            },
            withCredentials :true
           })
           if(res?.data?.success){
            toast.success(res.data.success)
            navigate("/admin/companies")
           }
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message)
        } finally{setLoding(false)}
    } 
    useEffect(()=>{
      setInput({
        name : singleCompany.name ||'',
        description :singleCompany.description ||"",
        website:singleCompany.website ||'',
        location :singleCompany.location ||"",
        logo : singleCompany.file ||null
      })
    },[singleCompany])
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={()=>navigate('/admin/companies')}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="text-xl font-semibold">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <Label>Company Name</Label>
          <Input 
          type='text'
          name='name'
          value={input.name}
          onChange={changeEventHandler}/>
            </div>
            <div>
                <Label>Description</Label>
          <Input 
          type='text'
          name='description'
          value={input.description}
          onChange={changeEventHandler}/>
            </div>
            <div>
                <Label>WebSite</Label>
          <Input 
          type='text'
          name='website'
          value={input.website}
          onChange={changeEventHandler}/>
            </div>
            <div>
                <Label>Location</Label>
          <Input 
          type='text'
          name='location'
          value={input.location}
          onChange={changeEventHandler}/>
            </div>
            <div>
              <Label>Logo</Label>
              <Input 
              type='file'
              accept='/image/*'
              onChange={changeFileHandler}/>
            </div>
          </div>
          {/* <Button type='submit' className='w-full my-10'>Update</Button> */}
          {loading ? 
            <Button className='w-full my-4'>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          : 
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          }
          </form>
      </div>
    </div>
  );
};

export default CompanySetup;
