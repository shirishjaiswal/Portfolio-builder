"use client"

export type NavigationTab = {
  id: string;
  label: string;
  isActive: boolean;
  onTabClick: () => void
};

export const dummyNavigationData: NavigationTab[] = [
  {
    id: "home",
    label: "Home",
    isActive: true,
    onTabClick: print,
  },
  {
    id: "about",
    label: "About",
    isActive: false,
    onTabClick : print,
  },
  {
    id: "projects",
    label: "Projects",
    isActive: false,
    onTabClick : print,
  },
  {
    id: "contact",
    label: "Contact",
    isActive: false,
    onTabClick : print,
  },
  {
    id: "portfolio",
    label: "Portfolio",
    isActive: false,
    onTabClick : print,
  },
];
