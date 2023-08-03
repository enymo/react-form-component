import { createContext, useContext } from "react";

const Context = createContext<boolean | undefined>(undefined);

export const LoadingProvider = Context.Provider;
export const useLoading = () => useContext(Context);