import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModel";
import React, { use, useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useNavigation } from "react-router-dom";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const handleInputChange = (name, value) => {
    if (name == "noofDays" && value > 5) {
      console.log("Please enter Trip days less than 5");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
    scope: "openid profile email",
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.travellers
    ) {
      toast("Please fill all details");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noofDays)
      .replace("{travellers}", formData?.travellers)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noofDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docID = Date.now().toString();
    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docID,
    });
    setLoading(false);
    navigate('/view-trip/'+docID)

  };
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));

        setOpenDialog(false);
        OnGenerateTrip();
      });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preference 🏕️🌴
      </h2>
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
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-bold">
            How many days are you planning to stay?
          </h2>
          <Input
            placeholder={"Example: 3"}
            type={"number"}
            min="1"
            max="5"
            onChange={(e) => handleInputChange("noofDays", e.target.value)}
          />
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-5 ">
        <h2 className="text-xl my-3 font-bold">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-6 mt-0.25 ">
          {SelectBudgetOptions.map((Item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", Item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow
                ${formData?.budget == Item.title && "shadow-lg border-black"}`}
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
              onClick={() => handleInputChange("travellers", Item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow
                ${
                  formData?.travellers == Item.people &&
                  "shadow-lg border-black"
                }`}
            >
              <h2 className="text-4xl">{Item.icon}</h2>
              <h2 className="font-bold text-lg">{Item.title}</h2>
              <h2 className="text-sm text-gray-500">{Item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <AlertDialog open={openDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign In with google</h2>
              <p>Sign in with Google authentication securely</p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center "
              >
                <FcGoogle className="h-7 w-7" />
                Sign in with Google
              </Button>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default CreateTrip;
