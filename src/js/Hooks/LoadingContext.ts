import { createContext, useContext } from "react";

const Context = createContext<boolean>(null);

export const LoadingProvider = Context.Provider;
export const useLoading = () => useContext(Context);