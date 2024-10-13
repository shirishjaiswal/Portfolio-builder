"use client";

import { useSideBarContextProvider } from "@/context/side-bar-contest-context";
import { SideBarItems } from "./type";
import SideBarItem from "./sidebar-button";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const sidebarItemSet: SideBarItems[] = [
  {
    id: "admin-header-style",
    label: "Header Style",
    isActive: false,
    isDisabled: false,
    redirectTo: "/admin-control/header-style",
  },
  {
    id: "admin-profile-page",
    label: "Profile Page",
    isActive: false,
    isDisabled: false,
    redirectTo: "/admin-control/profile-page",
  },
  {
    id: "admin-page-navigation",
    label: "Page Navigation",
    isActive: false,
    isDisabled: false,
    redirectTo: "/admin-control/page-navgation",
  },
];

const Sidebar = () => {
  const path = usePathname();
  const { sideBarItems, updateSideBarItems } = useSideBarContextProvider();

  useEffect(()=> {
    if (sideBarItems.length === 0) {
      updateSideBarItems(sidebarItemSet);
    } else {
      updateSideBarItems(sideBarItems);
    }
  
    sidebarItemSet.forEach((item) => {
      if(path === item.redirectTo) {
        item.isActive = true
      }
    })
  }, [])
  return (
    <div className="w-20p h-screen bg-gray-50 py-2 fixed left-0">
      {sideBarItems.map((item) => (
        <SideBarItem key={item.label} {...item} />
      ))}
    </div>
  );
};

export default Sidebar;
