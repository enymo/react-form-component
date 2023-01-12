import { createContext, useContext } from "react";

const Context = createContext<boolean>(null);
export const DisabledProvider = Context.Provider;
export const useDisabled = () => useContext(Context);