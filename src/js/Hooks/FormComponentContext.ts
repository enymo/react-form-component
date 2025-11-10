import { createContext, useContext } from "react";

const Context = createContext<{
    reactNative?: boolean,
    t?: (key: string) => string
}>({});

export const FormComponentProvider = Context.Provider;
export const useFormComponent = () => useContext(Context);