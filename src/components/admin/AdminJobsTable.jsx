import React, { useEffect, useState }  from 'react'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '../ui/table';
import {Avatar} from '../ui/avatar';
import { AvatarImage } from '../ui/avatar';
import {Popover,PopoverTrigger,PopoverContent} from '../ui/popover';
import {Edit2, Eye, MoreHorizontal} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
const AdminJobsTable = () => {
  //const {companies,searchcompanybytext} = useSelector(store=>store.company)
  const {alladminjobs,searchjobbytext} = useSelector(store=>store.job)
  const [filterjob,setFilterJob] = useState(alladminjobs)
   const navigate = useNavigate();
  useEffect(()=>{
        const filteredjob = alladminjobs.length >= 0 && alladminjobs.filter((job)=>{
          if(!searchjobbytext){
            return true;
          }
            return job?.company?.name?.toLowerCase().includes(searchjobbytext.toLowerCase()) || job?.title?.toLowerCase().includes(searchjobbytext.toLowerCase())
        })
        setFilterJob(filteredjob)
  },[alladminjobs,searchjobbytext])
  return (
    <div>
     <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className={'text-right'}>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
              {
                filterjob?.map((job)=>(
                    <tr>
           <TableCell>{job?.company?.name}</TableCell>
           <TableCell>{job?.title}</TableCell>
            {/* <TableCell onClick={()=>navigate("/admin/companies/create")}>{job?.company?.name}</TableCell> */}
            <TableCell>{job.createdAt.split("T")[0]}</TableCell>
            <TableCell className='text-right cursor-pointer '>
              <Popover>
                <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                <PopoverContent className="w-32">
                  <div onClick={()=>navigate(`/admin/companies/${job._id}`)}className='flex items-center w-fit gap-2 cursor-pointer'>
                     <Edit2  className='w-4'/>
                    <span>Edit</span>
                  </div>
                  <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer'>
                    <Eye  className='w-4'/>
                    <span>Applicant</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
                    </tr>
                  ))
              }
        </TableBody>
     </Table>
    </div>
  )
}

export default AdminJobsTable;
