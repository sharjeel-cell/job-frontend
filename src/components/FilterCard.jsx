import React, { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import {useDispatch} from 'react-redux';
import {setSearchedQuery} from '@/redux/jobSlice'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const filterData = [
  {
    filterType: "Location",
    array: [
      "Faisalabad",
      "Lahore",
      "Islamabad",
      "karachi",
      "Khanewal",
      "Toba",
      "Gujranwala",
    ],
  },
  {
    filterType: "Industry",
    array: ["Backend Developer", "Frontend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50-1lakh", "1lakh-5lakh"],
  },
];
const FilterCard = () => {
  const [selectedvalue,setSelectedValue] = useState('')
  const dispatch = useDispatch();
  
  const changeHandler = (value)=>{
     setSelectedValue(value)
  }
  useEffect(()=>{
      dispatch(setSearchedQuery(selectedvalue))
  },[selectedvalue])
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-2xl">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedvalue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div>
            <h1 className="text-lg font-bold">{data.filterType}</h1>
            {data.array.map((item, ind) => {
              const itemId = `id${index}-${ind}`
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
