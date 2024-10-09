"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

interface LoadingContextType {
  isLoading: boolean;
  updateIsLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

interface LoadingContextProps {
  children: ReactNode;
}

const LoadingContextProvider = ({ children }: LoadingContextProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateIsLoading = useCallback((isLoading: boolean) => {
    setIsLoading(isLoading);
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      updateIsLoading,
    }),
    [isLoading, updateIsLoading]
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

const useLoadingContextProvider = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export { LoadingContextProvider, useLoadingContextProvider };
