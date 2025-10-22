import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import axios from "../api/axios";
import {
  Dialog,
  DialogContent,
   DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  // DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner";
import { setUser } from '../redux/authSlice';
import { Label } from './ui/label';
import { USER_API_END_POINT } from "../utils/constant";
import {Input} from './ui/input'
import {Button} from './ui/button'
import { Loader2 } from "lucide-react";
const UpdateProfileDialog = ({open,setOpen}) => {
  const [loading,setLoading] = useState(false)
  const {user} = useSelector(store=>store.auth);

  const [input,setInput] = useState({
    fullname :user?.fullname || "",
    email :user?.email || "",
    phoneNumber:user?.phoneNumber || "",
    bio:user?.profile?.bio || "",
    skills:user?.profile?.skills?.map(skill=>skill) || "",
    file : null
    //user?.profile?.file
    });
    const dispatch = useDispatch();

    const changeEventHandler =(e)=>{
      setInput({...input,[e.target.name]:e.target.value})
    }
     
    const fileChangeHandler = (e)=>{
      const file = e.target.files?.[0];
      setInput({...input,file})
    }
    const submitHandler = async (e)=>{
      e.preventDefault();
      const formdata = new FormData();
      formdata.append("fullname",input.fullname)
      formdata.append("email",input.email)
      formdata.append("phoneNumber",input.phoneNumber)
      formdata.append("bio",input.bio)
      formdata.append("skills", input.skills);
      //formdata.append("skills",input.skills)
      if(input.file){
        formdata.append("file",input.file)
      }
      try {
         setLoading(true)
       const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formdata,{
        headers:{
          'Content-Type' : 'multipart/form-data'
        },
        withCredentials : true
       })
       if(res.data.success){
         dispatch(setUser(res.data.user))
         toast.success(res.data.message)
       }
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }finally{
        setLoading(false)
      }
      setOpen(false)
      console.log(input);
    }
    return (
    <div>
     <Dialog open={open}>
        <DialogContent className='sm:max-w-[425px]' onInteractOutside={()=>setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
             <DialogDescription>
        Update your name, email, and other profile information.
      </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-3'>
                 <Label htmlFor='name' className='text-right'>Name</Label>
              <Input 
              name='fullname'
              id='name'
              value={input.fullname}
              onChange={changeEventHandler}
              className='col-span-3'
              />
              </div>
              <div className='grid grid-cols-4 items-center gap-3'>
                 <Label htmlFor='email' className='text-right'>Email</Label>
              <Input 
              name='email'
              id='email'
              value={input.email}
              onChange={changeEventHandler}
              className='col-span-3'
              />
              </div>
              <div className='grid grid-cols-4 items-center gap-3'>
                 <Label htmlFor='number' className='text-right'>Number</Label>
              <Input 
              name='phoneNumber'
              id='number'
              value={input.phoneNumber}
              onChange={changeEventHandler}
              className='col-span-3'
              />
              </div>
              <div className='grid grid-cols-4 items-center gap-3'>
                 <Label htmlFor='bio' className='text-right'>Bio</Label>
              <Input 
              name='bio'
              id='bio'
              value={input.bio}
              onChange={changeEventHandler}
              className='col-span-3'
              />
              </div>
              <div className='grid grid-cols-4 items-center gap-3'>
                 <Label htmlFor='skills' className='text-right'>Skills</Label>
              <Input 
              name='skills'
              id='skills'
              value={input.skills}
              onChange={changeEventHandler}
              className='col-span-3'
              />
              </div>
              <div className='grid grid-cols-4 items-center gap-3'>
                 <Label htmlFor='file' className='text-right'>Resume</Label>
              <Input 
              name='file'
              id='file'
               type='file'
               onChange={fileChangeHandler}
              accept='application/pdf'
              className='col-span-3'
              />
              </div>
            </div>
            <DialogFooter>
               {
               loading ? 
            <Button className='w-full my-4'>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          : 
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          }
            </DialogFooter>
          </form>
        </DialogContent>
     </Dialog>
    </div>
  )
}

export default UpdateProfileDialog
