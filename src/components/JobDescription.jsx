import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import {JOB_API_END_POINT} from '@/utils/constant';
import {setSingleJob} from '@/redux/jobSlice';
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
import {toast} from 'sonner'
import { APPLICATION_API_END_POINT } from "../utils/constant";
const JobDescription = () => {
  const {singlejob} = useSelector((store)=>store.job)
  const {user} = useSelector((store)=>store.auth)
  const isInstilyApplied = singlejob?.applications?.some(application=>application.applicant === user?._id) || false;
  const [isApplied,setIsApplied] = useState(isInstilyApplied)
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async ()=>{
   try {
    const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
    if(res.data.success){
      setIsApplied(true) // update the localy state
      const updatedSingleJOb = {...singlejob,applications:[...singlejob.applications,{applicant:user?._id}]}
      dispatch(setSingleJob(updatedSingleJOb))
      toast.success(res.data.message)
    }
   } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
   }
  }
   useEffect(()=>{
    const fetchSingleJob = async ()=>{
          try {
            const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true})
            console.log(res.data)
            if(res.data.success){
                dispatch(setSingleJob(res.data.job))
                setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
            }
          } catch (error) {
            console.log(error)
          }
    }
    fetchSingleJob()
},[jobId,dispatch, user?._id])

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singlejob?.title}</h1>
          <div className="flex items-center gap-5 mt-2">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singlejob?.position} Position
            </Badge>
            <Badge className="text-[#f83002] font-bold" variant="ghost">
              {singlejob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singlejob?.salary} K
            </Badge>
          </div>
        </div>
        <Button
          onClick = {isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#bdb9c0]"
          }`}
        >
          {isApplied ? " Already Apply" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-3">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-medium text-gray-800">
            {singlejob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-medium text-gray-800">{singlejob?.location}</span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-medium text-gray-800">
            {singlejob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-medium text-gray-800">{singlejob?.experience} year</span>
        </h1>
        <h1 className="font-bold my-1">
          salary:<span className="pl-4 font-medium text-gray-800">{singlejob?.salary} k</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicant:
          <span className="pl-4 font-medium text-gray-800">{singlejob?.applications?.length}</span>
        </h1>
        <h1 className="font-bold my-1">
          Poste:
          <span className="pl-4 font-medium text-gray-800">{singlejob?.createdAt.split("T")[0]}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
