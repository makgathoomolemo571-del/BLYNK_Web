import {
  Search,
  Plus,
  Bell,
  MessageCircle,
  MoreVertical
} from "lucide-react";
import { useParams } from "react-router-dom";
import "./Topbar.css";
import UserMenu from "./UserMenu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import QuickStartLive from "../../../modules/watchParty/components/QuickStartLive";


export default function Topbar({
  toggleRightSidebar
}) {
    
 
    const [liveOpen, setLiveOpen] = useState(false);
const { id } = useParams();

const navigate = useNavigate();

  return (

    <header className="topbar">

      <div className="search-box">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search people, businesses, posts..."
        />

      </div>

      <div className="top-actions">

   <button
  className="create-btn"
  onClick={() =>navigate("/posts/create")}
>
  <Plus size={18} />
  Create
</button>






   <button
  className="icon-btn"
  onClick={() =>navigate("/notifications")}
>
  <Bell size={20}/>
</button>

   <button
  className="icon-btn"
  onClick={() =>navigate("/conversations")}
>
  <MessageCircle size={20}/>
</button>
   <UserMenu />

   <button
    className="icon-btn"
    onClick={toggleRightSidebar}
>
    <MoreVertical size={20}/>
</button>



</div>

    </header>

  );

}