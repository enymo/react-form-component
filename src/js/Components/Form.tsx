import React, { useCallback, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import BaseForm, { SubmitHandler } from "./BaseForm";

export default function Form<T extends FieldValues>({onSubmit, ...props}: {
    form: UseFormReturn<T>,
    onSubmit: SubmitHandler<T>,
    className?: string,
    children: React.ReactNode
}) {
    const [loading, setLoading] = useState(false);

    const handleSubmit: SubmitHandler<T> = useCallback(async (...args) => {
        setLoading(true);
        await onSubmit(...args);
        setLoading(false);
    }, [onSubmit, setLoading])

    return (
        <BaseForm
            onSubmit={handleSubmit}
            loading={loading}
            {...props}
        />
    )
}