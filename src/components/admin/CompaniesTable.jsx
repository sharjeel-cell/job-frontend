import React, { useEffect, useState }  from 'react'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from '../ui/table';
import {Avatar} from '../ui/avatar';
import { AvatarImage } from '../ui/avatar';
import {Popover,PopoverTrigger,PopoverContent} from '../ui/popover';
import {Edit2, MoreHorizontal} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
const CompaniesTable = () => {
  const {companies,searchcompanybytext} = useSelector(store=>store.company)
  const [filtercompany,setFilterCompany] = useState(companies)
   const navigate = useNavigate();
  useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
          if(!searchcompanybytext){
            return true;
          }
            return company?.name?.toLowerCase().includes(searchcompanybytext.toLowerCase())
        })
        setFilterCompany(filteredCompany)
  },[companies,searchcompanybytext])
  return (
    <div>
     <Table>
        <TableCaption>A list of your recent regestred companies</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className={'text-right'}>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
              {
                filtercompany?.map((company)=>(
                    <tr>
                       <TableCell>
              <Avatar>
            <AvatarImage src={company.logo} />
          </Avatar>
            </TableCell>
            <TableCell onClick={()=>navigate("/admin/companies/create")}>{company.name}</TableCell>
            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
            <TableCell className='text-right cursor-pointer '>
              <Popover>
                <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                <PopoverContent className="w-32">
                  <div onClick={()=>navigate(`/admin/companies/${company._id}`)}className='flex items-center w-fit gap-2 cursor-pointer'>
                     <Edit2  className='w-4'/>
                    <span>Edit</span>
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

export default CompaniesTable
