import React, { useEffect,useState } from "react";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from "@react-oauth/google";
import { useNavigation } from "react-router-dom";
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
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";


function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    console.log(user);
  }, []);
  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
    scope: "openid profile email",
  }); 
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
        window.location.reload()
        
      });
  }
  return (
    <div className="p-3 shadow-sm flex justify-between item-centre px-5">
      <img src="/logo.svg" />
      <div>{user ? <div className="flex items-center gap-3">
        <a href='/create-trip'>
        <Button variant="outline" className='rounded-full'>+ Create Trip</Button>
        </a>
        <a href='/my-trips'>
        <Button variant="outline" className='rounded-full'>My Trips</Button>
        </a>
        <Popover>
        <PopoverTrigger><img src={user?.picture} className="h-[35px] w-[35px] rounded-full"/></PopoverTrigger>
        <PopoverContent>
          <h2 className='cursor-pointer'onClick={()=>{
            googleLogout();
            localStorage.clear();
            window.location.reload();
            

          }}>Logout</h2>
        </PopoverContent>
        </Popover>

        

      </div> : <Button onClick={()=>setOpenDialog(true)}>Sign In</Button>}</div>
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

export default Header;
