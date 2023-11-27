import { AxiosError } from "axios";
import React, { useCallback, useState } from "react";
import { FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import BaseForm, { FormProps, SubmitHandler } from "./BaseForm";

export default function Form<T extends FieldValues>({onSubmit, form, ...props}: FormProps<T>) {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);

    const handleSubmit: SubmitHandler<T> = useCallback(async (...args) => {
        setLoading(true);
        try {
            await onSubmit?.(...args);
        }
        catch (e) {
            if (e instanceof AxiosError && "errors" in e.response?.data) {
                for (const [key, value] of Object.entries(e.response?.data.errors)) {
                    form.setError(key as Path<T>, {
                        type: "manual",
                        message: t(value as string)
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