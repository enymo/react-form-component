import { createContext, useContext } from "react";

const Context = createContext<boolean | undefined>(undefined);
export const DisabledProvider = Context.Provider;
export const useDisabled = () => useContext(Context);