import { FieldValues, Path } from "react-hook-form";

export default class FormError extends Error {
    constructor(
        public errors: Partial<Record<Path<FieldValues>,string>>,
        message?: string
    ) {
        super(message);
    }
}