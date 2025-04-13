// import { GetPlaceDetails } from "@/service/GlobalApi";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { PHOTO_REF_URL } from "./InfoSection";


// function HotelCardItem({ hotel }) {
//     const [photoUrl,setPhotoUrl]=useState();
//   useEffect(()=>{
//     hotel&&GetPlacePhoto();
//   },[hotel])

//   const GetPlacePhoto=async()=>{
//     const data={
//       textQuery:hotel?.hotelName

//     }
//     console.log(hotel?.hotelName)

//     const result=await GetPlaceDetails(data).then(resp=>{
//       console.log(resp.data)
//       const PhotoUrl=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[0].name);
//       setPhotoUrl(PhotoUrl);
//     })
//   }
//   return (
//     <Link
//       to={
//         "https://www.google.com/maps/search/?api=1&query=" +
//         hotel.hotelName +
//         "," +
//         hotel?.hotelAddress
//       }
//       target="_blank"
//     >
//       <div className="hover:scale-105 transition-all cursor-pointer">
//         <img src={photoUrl} className="rounded-xl" />
//         <div className="mt-3 my-2 flex flex-col gap-3">
//           <h2 className="font-medium">{hotel?.hotelName}</h2>
//           <h2 className="font-medium">📍{hotel?.hotelAddress}</h2>
//           <h2 className="text-sm">💵 {hotel?.price}</h2>
//           <h2 className="text-sm">⭐{hotel?.rating}</h2>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default HotelCardItem;
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PHOTO_REF_URL } from "./InfoSection";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };

    console.log(hotel?.hotelName);

    try {
      const result = await GetPlaceDetails(data);
      const place = result.data.places[0];
      const photos = place?.photos;

      if (photos && photos.length > 0) {
        const photoRef = photos[0].name; // fallback to first photo
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
        setPhotoUrl(photoUrl);
      } else {
        setPhotoUrl("/fallback.jpg"); // fallback image in public folder
      }
    } catch (error) {
      console.error("Error fetching photo:", error);
      setPhotoUrl("/fallback.jpg"); // in case of error
    }
  };

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        hotel.hotelName +
        "," +
        hotel?.hotelAddress
      }
      target="_blank"
    >
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl || "/placeholder.jpg"}
          onError={(e) => {
            e.target.src = "/placeholder.jpg";
          }}
          className="rounded-xl h-[180px] w-full object-cover"
        />
        <div className="mt-3 my-2 flex flex-col gap-3">
          <h2 className="font-medium">{hotel?.hotelName}</h2>
          <h2 className="font-medium">📍{hotel?.hotelAddress}</h2>
          <h2 className="text-sm">💵 {hotel?.price}</h2>
          <h2 className="text-sm">⭐{hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
