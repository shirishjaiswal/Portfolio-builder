"use client";

import { SideBarItems } from "@/components/side-bar/type";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface SideBarContextProps {
  sideBarItems: SideBarItems[];
  updateSideBarItems: (sideBarItems: SideBarItems[]) => void;
}

const SideBarContext = createContext<SideBarContextProps | undefined>(
  undefined
);

interface SideBarContextProviderProps {
  children: ReactNode;
}

const SideBarContextProvider = ({ children }: SideBarContextProviderProps) => {
  const [sideBarItems, setSideBarItems] =
    useState<SideBarItems[]>([]);

  const updateSideBarItems = useCallback((sideBarItems: SideBarItems[]) => {
    setSideBarItems(sideBarItems);
  }, []);

  const value = useMemo(
    () => ({
      sideBarItems,
      updateSideBarItems,
    }),
    [sideBarItems, updateSideBarItems]
  );

  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
};

const useSideBarContextProvider = () => {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error(
      "useSideBarContextProvider must be used within a SideBarContextProvider"
    );
  }
  return context;
};

export { SideBarContextProvider, useSideBarContextProvider };
