import { AxiosError } from "axios";
import React, { useCallback, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import BaseForm, { SubmitHandler } from "./BaseForm";

export default function Form<T extends FieldValues>({onSubmit, form, ...props}: {
    form: UseFormReturn<T>,
    onSubmit: SubmitHandler<T>,
    disabled?: boolean,
    className?: string,
    children: React.ReactNode
}) {
    const [loading, setLoading] = useState(false);

    const handleSubmit: SubmitHandler<T> = useCallback(async (...args) => {
        setLoading(true);
        try {
            await onSubmit(...args);
        }
        catch (e) {
            if (e instanceof AxiosError && "errors" in e.response?.data) {
                for (const [key, value] of Object.entries(e.response?.data.errors)) {
                    form.setError(key as Path<T>, {
                        type: "manual",
                        message: value as string
                    });
                }
            }
            else {
                throw e;
            }
        }
        setLoading(false);
    }, [onSubmit, setLoading])

    return (
        <BaseForm
            form={form}
            onSubmit={handleSubmit}
            loading={loading}
            {...props}
        />
    )
}