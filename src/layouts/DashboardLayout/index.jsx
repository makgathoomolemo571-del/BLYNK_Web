import { Outlet } from "react-router-dom";
import React, { useState } from "react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import RightSidebar from "./components/RightSidebar";
import MobileNav from "./components/MobileNav";

import "./DashboardLayout.css";

export default function DashboardLayout() {

  // LEFT SIDEBAR
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // RIGHT SIDEBAR
  const [rightSidebarOpen, setRightSidebarOpen] =
    useState(false);


  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };


  const toggleRightSidebar = () => {
    setRightSidebarOpen(prev => !prev);
  };


  return (
    <div
      className={`dashboard ${
        sidebarOpen ? "sidebar-open" : "sidebar-collapsed"
      }`}
    >

      {/* LEFT SIDEBAR */}

      <Sidebar
        open={sidebarOpen}
        onToggle={toggleSidebar}
      />


      <div className="dashboard-center">

        <Topbar
          toggleRightSidebar={toggleRightSidebar}
        />


        <main className="dashboard-content">
          <Outlet />
        </main>

      </div>


      {/* RIGHT SIDEBAR */}

      <RightSidebar
        open={rightSidebarOpen}
        onClose={() =>
          setRightSidebarOpen(false)
        }
      />


      <MobileNav />

    </div>
  );
}