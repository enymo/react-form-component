import React, { useCallback } from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import { DisabledProvider } from "../Hooks/DisabledContext";
import { LoadingProvider } from "../Hooks/LoadingContext";
import { SubmitProvider } from "../Hooks/SubmitContext";

export type SubmitHandler<T extends FieldValues> = (data: T, event?: React.BaseSyntheticEvent, submitButton?: string) => any | Promise<any>;
export interface FormProps<T extends FieldValues> {
    id?: string,
    form: UseFormReturn<T>,
    onSubmit?: SubmitHandler<T>,
    disabled?: boolean,
    className?: string,
    loading?: boolean,
    reactNative?: boolean
    children: React.ReactNode,
}

export default function BaseForm<T extends FieldValues>({
    id,
    form,
    onSubmit,
    disabled = false,
    className,
    loading = false,
    reactNative = false,
    children
}: FormProps<T>) {
    const handleSubmit = useCallback((submitButton?: string) => {
        return form.handleSubmit((data, event) => onSubmit?.(data, event, submitButton));
    }, [form, onSubmit]);

    const content = (
        <FormProvider {...form}>
            <LoadingProvider value={loading}>
                <SubmitProvider value={handleSubmit}>
                    <DisabledProvider value={disabled}>
                        {children}
                    </DisabledProvider>
                </SubmitProvider>
            </LoadingProvider>
        </FormProvider>
    )

    return reactNative ? content : (
        <form id={id} className={className} onSubmit={onSubmit && form.handleSubmit(onSubmit)}>
            {content}
        </form>
    )
}