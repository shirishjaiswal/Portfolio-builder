"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface UserRoleContextType {
  userRole: string | undefined;
  updateUserRole: (userRole: string) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(
  undefined
);

interface UserRoleContextProps {
  children: ReactNode;
  role : string | undefined
}

const UserRoleContextProvider = ({ children, role }: UserRoleContextProps) => {

  const [userRole, setUserRole] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    updateUserRole(role);
  });

  const updateUserRole = useCallback((userRole: string | undefined ) => {
    let role : string;
    if(userRole === "ROLE_SUPER_ADMIN") role = "SUPER_ADMIN";
    else if(userRole === "ROLE_ADMIN") role = "ADMIN";
    else role = "USER";
    setUserRole(role);
  }, []);

  const value = useMemo(
    () => ({
      userRole,
      updateUserRole,
    }),
    [userRole, updateUserRole]
  );

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
};

const useUserRoleContextProvider = () => {
  const context = useContext(UserRoleContext);
  if (!context) {
    throw new Error("useUserRole must be used within a UserRoleProvider");
  }
  return context;
};

export { UserRoleContextProvider, useUserRoleContextProvider };
