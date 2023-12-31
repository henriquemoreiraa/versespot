"use client";

import { enBooksOptions, enVersionsOptions } from "@/app/constants";
import { StaticImageData } from "next/image";
import {
  createContext,
  useMemo,
  PropsWithChildren,
  useContext,
  useState,
  Dispatch,
} from "react";

export type SelectedType = {
  [key: string]: {
    label: string;
    value: string | number;
    image?: StaticImageData;
  };
};

type OptionsContextType = {
  selected: SelectedType;
  setSelected: Dispatch<SelectedType>;
};

export const OptionsContext = createContext<OptionsContextType>({
  selected: {},
  setSelected: () => {},
});

export const useOptionsContext = () => useContext(OptionsContext);

export default function OptionsProvider({ children }: PropsWithChildren) {
  const [selected, setSelected] = useState<SelectedType>({
    [enBooksOptions.type]: enBooksOptions.data[0],
    [enVersionsOptions.type]: enVersionsOptions.data[0],
  });

  const value: OptionsContextType = useMemo(
    () => ({
      selected,
      setSelected,
    }),
    [selected]
  );
  return (
    <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
  );
}
