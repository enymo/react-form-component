import React, { createContext, useContext } from "react";

const Context = createContext<((name?: string) => (e: React.BaseSyntheticEvent) => Promise<void>) | null>(null);
export const SubmitProvider = Context.Provider;
export const useSubmit = (submitButton?: string) => useContext(Context)?.(submitButton);