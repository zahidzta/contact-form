import { useState, type ChangeEvent, type SubmitEvent } from "react";
import type { FormErrors, FormType } from "../types";


type useFormProps = {
    initialValues: FormType,
    validate: (values: FormType) => FormErrors
    onSubmit: (values: FormType) => void
}

export function useForm({ initialValues, onSubmit, validate }: useFormProps) {

    const [values, setValues] = useState<FormType>(initialValues)
    const [errors, setErrors] = useState<FormErrors>({})


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, type, value } = e.target
        const finalValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value

        setValues((prev) => ({ ...prev, [name]: finalValue }))

        if (errors[name as keyof FormType]) {
            setErrors((prev) => {
                const next = { ...prev }
                delete next[name as keyof FormType]
                return next
            })
        }
    }

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validatedErrors = validate(values)
        setErrors(validatedErrors)

        if (Object.keys(validatedErrors).length === 0) {
            onSubmit(values)
        }
    }

    const resetForm = () => {
        setErrors({})
        setValues(initialValues)
    }

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        resetForm
    }
}