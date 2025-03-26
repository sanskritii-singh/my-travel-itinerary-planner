import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip() {
  const [place, setPlace] = useState();
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preference</h2>
      <p className="mt-3 text-gray-500 text-xl">
        From solo adventures to family getaways, tell us what you love, and
        we'll create the perfect plan.
      </p>
      <div className="mt-10 flex flex-col gap-10 ">
        <div>
          <h2 className="font-bold text-xl my-3 ">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                console.log(v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-bold">
            How many days are you planning to stay?
          </h2>
          <Input placeholder={"Example: 3"} type={"number"} min="1" />
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5 ">
        <h2 className="text-xl my-3 font-bold">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-6 mt-0.25 ">
          {SelectBudgetOptions.map((Item, index) => (
            <div
              key={index}
              className="p-4 border cursor-pointer rounded-lg hover:shadow"
            >
              <h2 className="text-4xl">{Item.icon}</h2>
              <h2 className="font-bold text-lg">{Item.title}</h2>
              <h2 className="text-sm text-gray-500">{Item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5 ">
        <h2 className="text-xl my-3 font-bold">
          Who do you plan to travel with in your next adventure?
        </h2>
        <div className="grid grid-cols-4 gap-6 mt-0.25 mb-10">
          {SelectTravelesList.map((Item, index) => (
            <div
              key={index}
              className="p-4 border cursor-pointer rounded-lg hover:shadow"
            >
              <h2 className="text-4xl">{Item.icon}</h2>
              <h2 className="font-bold text-lg">{Item.title}</h2>
              <h2 className="text-sm text-gray-500">{Item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button>Generate Trip</Button>
      </div>
    </div>
       
  );
}

export default CreateTrip;
