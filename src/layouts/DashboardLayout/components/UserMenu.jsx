import { useState } from "react";
import {
  ChevronDown,
  User,
  Wallet,
  BriefcaseBusiness,
  Palette,
  Settings,
  LogOut
} from "lucide-react";

import "./UserMenu.css";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../modules/auth/store/authSlice";
import { useNavigate } from "react-router-dom";


export default function UserMenu() {

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

const navigate = useNavigate();

const user = useSelector(state=>state.auth.user);

const handleLogout=()=>{

localStorage.removeItem("accessToken");

localStorage.removeItem("refreshToken");

dispatch(logout());

navigate("/login");

};

  return (

    <div className="user-menu">

      <button
        className="profile-button"
        onClick={() => setOpen(!open)}
      >

        <img

src={
user?.profilePicture ||
"/images/default-avatar.png"
}

alt={user?.username}

/>

        <div>

          <strong>

{user?.displayName || user?.username}

</strong>

<small>

@{user?.username}

</small>

          

        </div>

        <ChevronDown size={18} />

      </button>

      {open && (

        <div className="dropdown">

        <button
  onClick={() => {
    setOpen(false);
    navigate("/profile/me");
  }}
>
  <User size={18} />
  Profile
</button>
<button
  onClick={() => {
    setOpen(false);
    navigate("/creator-studio");
  }}
>
  <Palette size={18} />
  Creator Studio
</button>
<button
  onClick={() => {
    setOpen(false);
    navigate("/business-studio");
  }}
>
  <BriefcaseBusiness size={18} />
  Business Studio
</button>

          <button
  onClick={() => {
    setOpen(false);
    navigate("/wallet");
  }}
>
  <Wallet size={18} />
  Wallet
</button>

          <button>
            <Settings size={18}/>
            Settings
          </button>

          <hr />

          <button
className="logout"
onClick={handleLogout}
>

<LogOut size={18}/>

Logout

</button>

        </div>

      )}

    </div>

  );

}