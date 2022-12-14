import React, { createContext, useContext } from "react";

const Context = createContext<{
    loading: boolean,
    handleSubmit: (name?: string) => (e?: React.BaseSyntheticEvent) => Promise<void>
}>({
    loading: null,
    handleSubmit: undefined
});

export const ButtonContextProvider = Context.Provider;
export const useButtonContext = () => useContext(Context);