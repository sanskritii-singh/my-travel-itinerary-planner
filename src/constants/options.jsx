export const SelectTravelesList=[
{
    id:1,
    title:'Just me',
    desc:'A solo traveler in exploration',
    icon:'✈️',
    people:'1'
},
{
    id:2,
    title:'A couple',
    desc:'Two Travelers in Tandem',
    icon:'🥂',
    people:'2'

},
{
    id:3,
    title:'Family',
    desc:'A group of fun loving people',
    icon:'🏡',
    people:'3 to 5 people'
},
{
    id:4,
    title:'Friend Group',
    desc:'Friends who travel together,stay together',
    icon:'🫂',
    people:'5 to 8 people'
}
    
]
export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Need not worry about budget',
        icon:'💸'
    }
]
export const AI_PROMPT='Generate Travel Plan for Location : {location} , for {totalDays} for {travellers} with a {budget} budget,give me Hotels options list with HotelName, Hotel address, Price, hotel image url,geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing,Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format. '