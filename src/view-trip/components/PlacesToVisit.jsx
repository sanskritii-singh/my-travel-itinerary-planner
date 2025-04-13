// import React from 'react';

// function PlacesToVisit({ trip }) {
//   const itineraryObject = trip.tripData?.itinerary;
//   const itineraryArray = itineraryObject
//   ? Object.entries(itineraryObject).sort((a, b) => {
//       const getDayNumber = key => parseInt(key.replace('day', ''));
//       return getDayNumber(a[0]) - getDayNumber(b[0]);
//     })
//   : [];


//   return (
//     <div>
//       <h2 className='font-bold text-lg'>Places to Visit</h2>
//       <div>
//         {itineraryArray.map(([dayKey, item], index) => (
//           <div key={index} className='mb-4'>
//             <h3 className='font-semibold text-md '>{dayKey}</h3>
//             {item.theme && <p className='text-orange-800'>Theme: {item.theme}</p>}
//             {item.bestTimeToVisit && <p className='text-orange-500'>Best Time to Visit: {item.bestTimeToVisit}</p>}
//             {item.plan?.length > 0 && (
//               <ul className='list-disc list-inside '>
//                 {item.plan.map((place, i) => (
//                   <li key={i}>{place.placeName}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default PlacesToVisit;
import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  if (!trip || !trip.tripData || !trip.tripData.itinerary) {
    return <p className='text-red-500'>Trip data not available</p>;
  }

  return (
    <div>
      <h2 className='font-bold text-lg'>Places to Visit</h2>
      {Object.entries(trip.tripData.itinerary)
        .sort(([a], [b]) => parseInt(a.replace("day", "")) - parseInt(b.replace("day", "")))
        .map(([dayKey, item], index) => (
          <div key={index} className='mt-5' >
           <h2 className='font-medium text-lg'>
  {item.day
    ? item.day.replace(/(\D+)(\d+)/, '$1 $2')
    : `Day ${index + 1}`}
</h2>
<div className='grid md:grid-cols-2 gap-5'>

            {item.plan?.map((place, index) => (
              <div key={index}>
                <h2 className='font-medium text-base text-orange-500'> Best time to visit: {item.bestTimeToVisit}</h2>
                <PlaceCardItem place={place} />
              </div>
            ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default PlacesToVisit;

