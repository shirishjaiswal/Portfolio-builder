"use client";

import { getUniqueFieldKey, getUniqueGroupKey, getUniqueParentKey } from "@/components/app/user/profile-configuration/helper";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface UniqueKeyContextType {
  latestGroupUniqueKey: string;
  updateLatestGroupUniqueKey: (flag: boolean) => void;
  latestParentUniqueKey: string;
  updateLatestParentUniqueKey: (flag: boolean) => void;
  latestFieldUniqueKey: string;
  updateLatestFieldUniqueKey: (flag: boolean) => void;
}

const UniqueKeyContext = createContext<UniqueKeyContextType | undefined>(
  undefined
);

interface UniqueKeyContextProviderProps {
  children: ReactNode;
}

const UniqueKeyContextProvider = ({ children }: UniqueKeyContextProviderProps) => {
  const [latestGroupUniqueKey, setLatestGroupUniqueKey] = useState<string>("");
  const [latestParentUniqueKey, setLatestParentUniqueKey] = useState<string>("");
  const [latestFieldUniqueKey, setLatestFieldUniqueKey] = useState<string>("");

  const updateLatestGroupUniqueKey = useCallback((flag: boolean) => {
    setLatestGroupUniqueKey(flag ? getUniqueGroupKey() : "");
  }, []);

  const updateLatestParentUniqueKey = useCallback((flag: boolean) => {
    setLatestParentUniqueKey(flag ? getUniqueParentKey() : "");
  }, []);

  const updateLatestFieldUniqueKey = useCallback((flag: boolean) => {
    setLatestFieldUniqueKey(flag ? getUniqueFieldKey() : "");
  }, []);

  const value = useMemo(
    () => ({
      latestGroupUniqueKey,
      updateLatestGroupUniqueKey,
      latestParentUniqueKey,
      updateLatestParentUniqueKey,
      latestFieldUniqueKey,
      updateLatestFieldUniqueKey,
    }),
    [
      latestGroupUniqueKey,
      updateLatestGroupUniqueKey,
      latestParentUniqueKey,
      updateLatestParentUniqueKey,
      latestFieldUniqueKey,
      updateLatestFieldUniqueKey,
    ]
  );

  return (
    <UniqueKeyContext.Provider value={value}>
      {children}
    </UniqueKeyContext.Provider>
  );
};

const useUniqueKeyContextProvider = (): UniqueKeyContextType => {
  const context = useContext(UniqueKeyContext);
  if (!context) {
    throw new Error(
      "useUniqueKeyContext must be used within a UniqueKeyContextProvider"
    );
  }
  return context;
};

export { UniqueKeyContextProvider, useUniqueKeyContextProvider };
