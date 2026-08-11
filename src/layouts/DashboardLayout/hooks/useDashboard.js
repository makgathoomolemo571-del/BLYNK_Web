import { useState } from "react";

export default function useDashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [search, setSearch] = useState("");

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const [userMenuOpen, setUserMenuOpen] =
    useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  return {
    sidebarOpen,
    search,
    notificationsOpen,
    userMenuOpen,

    setSearch,

    toggleSidebar,
    toggleNotifications,
    toggleUserMenu
  };
}