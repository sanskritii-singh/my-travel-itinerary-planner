import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaShareAlt } from "react-icons/fa";

export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY

function InfoSection({trip}) {
  const [photoUrl,setPhotoUrl]=useState();
  useEffect(()=>{
    GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label

    }
    console.log(trip?.userSelection?.location?.label)

    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data)
      const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[0].name);
      setPhotoUrl(PhotoUrl);
    })
  }
  return (
    <div>
        <img src={photoUrl} className='h-[340px] w-full object-cover rounded-xl'></img>
        <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='text-3xl font-bold'>{trip?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className=' p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📆 {trip?.userSelection?.noofDays} Days</h2>
            <h2 className=' p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
            <h2 className=' p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. of Traveler : {trip?.userSelection?.travellers}</h2>
          </div>
        </div>
        <Button ><FaShareAlt /></Button>
      </div>
    </div>
  )
}

export default InfoSection
