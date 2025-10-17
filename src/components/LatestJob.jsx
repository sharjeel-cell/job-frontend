import LatestJobCarts from "./LatestJobCarts";
import { useSelector } from "react-redux";
//const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
const LatestJob = () => {
   const {alljobs} = useSelector((store)=>store.job)
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold ">
        <span className="text-[#6a38c2]">Latest & Top</span> Job Opening
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {/* {
        allJobs.length <= 0 ? <span>Job Not Avaiable</span> : allJobs?.slice(0, 6).map((job) => (
          <LatestJobCarts key={job._id} job={job}  />
        ))
        } */}
         {
         (!alljobs || alljobs.length === 0) ? (
          <span>Job Not Available</span>  // If allJobs is undefined or empty, show this message
        ) : (
          alljobs?.slice(0, 6).map((job) => (
            <LatestJobCarts key={job._id} job={job} />
          ))
        )
        }
      </div>
    </div>
  );
};

export default LatestJob;
