import React, { ReactText, useCallback } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { LoadingProvider } from "../Hooks/LoadingContext";
import { SubmitProvider } from "../Hooks/SubmitContext";

export type SubmitHandler<T extends FieldValues> = (data: T, event?: React.BaseSyntheticEvent, submitButton?: string) => any | Promise<any>;

export default function BaseForm<T extends FieldValues>({
    form,
    onSubmit,
    className,
    loading,
    children
}: {
    form: UseFormReturn<T>,
    onSubmit: SubmitHandler<T>,
    className?: string,
    loading?: boolean,
    children: React.ReactNode
}) {
    const handleSubmit = useCallback((submitButton?: string) => {
        return form.handleSubmit((data, event) => onSubmit(data, event, submitButton));
    }, [form, onSubmit]);

    return (
        <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
            <FormProvider {...form}>
                <LoadingProvider value={loading}>
                    <SubmitProvider value={handleSubmit}>
                        {children}
                    </SubmitProvider>
                </LoadingProvider>
            </FormProvider>
        </form>
    )
}