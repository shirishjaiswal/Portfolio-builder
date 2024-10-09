"use client";

import { NavigationSectionContentMap } from "@/components/admin-control/page-navigation/type";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface UserNavigationContentContextProps {
  navigationSectionContent: NavigationSectionContentMap;
  updateNavigationSectionContent: (
    navigationSectionContent: NavigationSectionContentMap
  ) => void;
}

const userNavigationContentContext = createContext<
  UserNavigationContentContextProps | undefined
>(undefined);

interface UserNavigationContentContextProviderProps {
  children: ReactNode;
}

const UserNavigationContenContextProvider = ({
  children,
}: UserNavigationContentContextProviderProps) => {
  const [navigationSectionContent, setNavigationSectionContent] =
    useState<NavigationSectionContentMap>(
      new Map() as NavigationSectionContentMap
    );

  const updateNavigationSectionContent = useCallback(
    (navigationSectionContent: NavigationSectionContentMap) => {
      setNavigationSectionContent(new Map(navigationSectionContent));
    },
    []
  );
  const value = useMemo(
    () => ({
      navigationSectionContent,
      updateNavigationSectionContent,
    }),
    [navigationSectionContent, updateNavigationSectionContent]
  );

  return (
    <userNavigationContentContext.Provider value={value}>
      {children}
    </userNavigationContentContext.Provider>
  );
};

const useUserNavigationContentContextProvider = () => {
  const context = useContext(userNavigationContentContext);
  if (context === undefined) {
    throw new Error(
      "useUserNavigationContentContextProvider must be used within a UserNavigationContenContextProvider"
    );
  }
  return context;
};

export {
  UserNavigationContenContextProvider,
  useUserNavigationContentContextProvider,
};
