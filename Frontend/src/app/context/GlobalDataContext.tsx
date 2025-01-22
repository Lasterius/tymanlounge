"use client";

import {
  GlobalData,
  GlobalDataProviderProps,
  IGlobalDataContext,
} from "@/shared/config/types/global.types";
import { createContext, useContext, useState } from "react";

const GlobalDataContext = createContext<IGlobalDataContext | undefined>(
  undefined,
);

export const useGlobalData = (): IGlobalDataContext => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error("useGlobalData must be used within a GlobalDataProvider");
  }
  return context;
};

export const GlobalDataProvider = ({
  children,
  initialGlobalData,
}: GlobalDataProviderProps) => {
  const [globalData, setGlobalData] = useState<GlobalData | null>(
    initialGlobalData,
  );

  return (
    <GlobalDataContext.Provider value={{ globalData, setGlobalData }}>
      {children}
    </GlobalDataContext.Provider>
  );
};
