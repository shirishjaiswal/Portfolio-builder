"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type UserDetailsType = {
  id: number;
  username?: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  password?: string;
  roles: string[];
  phoneNumber?: string | null;
  status?: string;
  provider?: string | null;
  createdOn?: [number, number, number, number, number, number, number];
  updatedOn?: [number, number, number, number, number, number, number];
  lastLogin?: string | null;
  authorities?: object[];
  emailVerified: boolean;
  accountNonLocked?: boolean;
  accountNonExpired?: boolean;
  phoneVerified: boolean;
  enabled?: boolean;
  credentialsNonExpired?: boolean;
};

type SettingsTabType = {
  id: string;
  label: string;
};
interface UserSettingsContextType {
  userDetails: UserDetailsType;
  updateUserDetails: (userDetails: UserDetailsType) => void;
  activeSettingsTab: SettingsTabType | null;
  updateActiveSettingsTab: (activeSettingsTab: SettingsTabType | null) => void;
}

interface UserSettingsContextProps {
  children: ReactNode;
}

const UserSettingContext = createContext<UserSettingsContextType | undefined>(
  undefined
);

const UserSettingsContextProvider = ({
  children,
}: UserSettingsContextProps) => {
  const [userDetails, setUserDetails] = useState<UserDetailsType>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
    status: "",
    phoneNumber: "",
    emailVerified: false,
    phoneVerified: false,
  });

  const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsTabType | null>(null);

  const updateUserDetails = useCallback((userDetails: UserDetailsType) => {
    setUserDetails(userDetails);
  }, []);

  const updateActiveSettingsTab = useCallback(
    (activeSettingsTab: SettingsTabType | null) => {
      setActiveSettingsTab(activeSettingsTab);
    },
    []
  );

  const value = useMemo(
    () => ({
      userDetails,
      updateUserDetails,
      activeSettingsTab,
      updateActiveSettingsTab,
    }),
    [userDetails, updateUserDetails, activeSettingsTab, updateActiveSettingsTab]
  );

  return (
    <UserSettingContext.Provider value={value}>
      {children}
    </UserSettingContext.Provider>
  );
};
const useUserSettingsContext = () => {
  const context = useContext(UserSettingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export { UserSettingsContextProvider, useUserSettingsContext };
