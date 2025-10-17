import React from "react";
import { Button } from "./ui/button";
import { Bookmark, Link } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
const Job = ({job}) => {
  const navigate = useNavigate();
  // const jobId = 'jdlkjldsfk'
   const daysAgoFunction =(mongodbTime)=>{
    const createdAt = new Date(mongodbTime)
    const currentTime = new Date()
    const timeDifference = currentTime-createdAt
    return Math.floor(timeDifference/(1000*24*60*60))
   }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-300">
      <div className="flex items-center justify-between">
        <p className="text-gray-700">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-xl">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">Pakistan</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg">{job?.title}</h1>
        <p className="text-sm text-gray-400">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Position
        </Badge>
        <Badge className="text-[#f83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} K
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button className="bg-[#10107e]">Save for later</Button>
      </div>
    </div>
  );
};

export default Job;
