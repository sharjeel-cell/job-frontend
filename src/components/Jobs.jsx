import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";
import {motion} from 'framer-motion'
//const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Jobs = () => {
  const {alljobs,searchedquery} = useSelector((store)=>store.job)
  const [filterjobs,setFilterJobs] = useState(alljobs)

  useEffect(()=>{
    if(searchedquery){
    const filteredJobs = alljobs.filter((job)=>{
      return job.title.toLowerCase().includes(searchedquery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedquery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedquery.toLowerCase())
    })
    setFilterJobs(filteredJobs)
    }else{
      setFilterJobs(alljobs)
    }
  },[alljobs,searchedquery])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {
          filterjobs.length <= 0 ? (
            <span>No Job Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-5">
                {filterjobs.map((job) => (
                  <motion.div 
                  initial={{opacity:0,x:100}}
                  animate={{opacity:1,x:0}}
                  exit={{opacity:0,x:-100}}
                  transition={{duration:0.3}}
                  key={job?._id}>
                    <Job job={job}/>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
