import React, { createContext, FC, ReactNode, useState } from "react";
import Loading from "../component/Loading";

// Definisikan tipe data untuk context
interface LoadingContextProps {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoadingProviderProps {
  children: ReactNode;
}

// Buat context dengan nilai default
const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

// Buat provider komponen
export const LoadingProvider: FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      <Loading isLoading={isLoading} />
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext