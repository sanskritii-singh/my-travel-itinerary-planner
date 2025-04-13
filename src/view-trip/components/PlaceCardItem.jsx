import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { GrMapLocation } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { PHOTO_REF_URL } from './InfoSection';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
  const data = {
    textQuery: place.placeName,
  };

  try {
    const result = await GetPlaceDetails(data);
    const places = result.data?.places;

    if (places && places.length > 0) {
      const placeData = places[0];
      const photos = placeData.photos;

      if (photos && photos.length > 0) {
        const photoRef = photos[0].name;
        const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoRef);
        setPhotoUrl(photoUrl);
      } else {
        console.warn("No photos found for this place.");
        setPhotoUrl("/placeholder.jpg");
      }
    } else {
      console.warn("No places found in API response.");
      setPhotoUrl("/placeholder.jpg");
    }
  } catch (error) {
    console.error("Error fetching photo:", error);
    setPhotoUrl("/placeholder.jpg");
  } finally {
    setLoading(false);
  }
};


  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${place.placeName}`} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        {/* Image with shimmer fallback */}
        {loading ? (
          <div className="rounded-xl h-[180px] w-[250px] bg-gray-200 animate-pulse"></div>
        ) : (
          <img
            src={photoUrl || "/placeholder.jpg"}
            onError={(e) => {
              e.target.src = "/placeholder.jpg";
            }}
            className="rounded-xl h-[180px] w-[250px] object-cover"
            alt={place.placeName}
          />
        )}
        <div>
          <h2 className='text-lg font-bold'>{place.placeName}</h2>
          <p className='text-sm text-gray-400'>{place.placeDetails}</p>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
