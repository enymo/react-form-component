import React, { createContext, useContext } from "react";

const Context = createContext<(name: string) => (e: React.BaseSyntheticEvent) => Promise<void>>(null);
export const SubmitProvider = Context.Provider;
export const useSubmit = () => useContext(Context);