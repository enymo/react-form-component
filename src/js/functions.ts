import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

export function setFormErrors<T extends FieldValues>(form: UseFormReturn<T>, errors: Partial<Record<Path<T>, string>>) {
    for (const [key, value] of Object.entries<string | undefined>(errors)) {
        if (value !== undefined) {
            form.setError(key as Path<T>, {
                type: "manual",
                message: value
            });
        }
    }
}

export function setFormValues<T extends FieldValues>(form: UseFormReturn<T>, values: Partial<Record<Path<T>, PathValue<T, Path<T>>>>) {
    for (const [key, value] of Object.entries<PathValue<T, Path<T>> | undefined>(values)) {
        if (value !== undefined) {
            form.setValue(key as Path<T>, value);
        }
    }
}