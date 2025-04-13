import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/view-trip/components/InfoSection';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all' >
      <img src={photoUrl?photoUrl:'/placeholder.jpg'} className='object-cover rounded-xl h-[250px] w-full' />
      <div>
        <h2 className='font-bold text-lg'>
            {trip?.userSelection?.location?.label}
        </h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection.noofDays} Days Trip with {trip?.userSelection?.budget} budget</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem
