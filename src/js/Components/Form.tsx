import { AxiosError } from "axios";
import React, { useCallback, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormError from "../FormError";
import { setFormErrors } from "../functions";
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
            if (e instanceof FormError) {
                setFormErrors(form, e.errors);
            }
            else if (e instanceof AxiosError && "errors" in e.response?.data) {
                setFormErrors(form, e.response?.data.errors);
            }
            else {
                throw e;
            }
        }
        finally {
            setLoading(false);
        }
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