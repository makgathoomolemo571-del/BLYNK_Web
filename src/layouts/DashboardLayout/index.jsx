import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import RightSidebar from "./components/RightSidebar";
import MobileNav from "./components/MobileNav";


import "./DashboardLayout.css";

export default function DashboardLayout() {
   
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
 
    

const toggleRightSidebar = () =>
    setRightSidebarOpen(prev => !prev);
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-center">

        

        <Topbar
    toggleRightSidebar={toggleRightSidebar}
/>


        <main className="dashboard-content">
          <Outlet />
        </main>

      </div>

      <RightSidebar
    open={rightSidebarOpen}
    onClose={() => setRightSidebarOpen(false)}
/>

      <MobileNav />

    </div>
  );
}