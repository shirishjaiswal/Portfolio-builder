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

type ROLE_TYPE = "SUPER_ADMIN" | "ADMIN" | "USER" | undefined;
type ROLE_INPUT_TYPE = "ROLE_SUPER_ADMIN" | "ROLE_ADMIN" | "ROLE_USER";

interface UserRoleContextType {
  userRole: ROLE_TYPE;
  updateUserRole: (userRole: ROLE_INPUT_TYPE) => void;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(
  undefined
);

interface UserRoleContextProps {
  children: ReactNode;
  role : ROLE_INPUT_TYPE
}

const UserRoleContextProvider = ({ children, role }: UserRoleContextProps) => {

  const [userRole, setUserRole] = useState<ROLE_TYPE>();
  
  useEffect(() => {
    updateUserRole(role);
  });

  const updateUserRole = useCallback((userRole: ROLE_INPUT_TYPE ) => {
    let role : ROLE_TYPE;
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
