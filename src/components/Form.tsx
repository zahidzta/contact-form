import { useState } from "react"
import { useForm } from "../hooks/useForm"
import type { FormErrors, FormType } from "../types"
import Alert from "./Alert"

const initialValues: FormType = {
    firstName: "",
    lastName: "",
    email: "",
    query: "General Enquiry",
    message: "",
    consent: false
}

export default function Form() {

    const [alert, setAlert] = useState(false)

    const validateRules = (formData: FormType) => {
        const newErrors: FormErrors = {}
        if (!formData.firstName.trim()) newErrors.firstName = "This field is required"
        if (!formData.lastName.trim()) newErrors.lastName = "This field is required"

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email.trim()) newErrors.email = "This field is required"
        else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address"

        if (!formData.query) newErrors.query = "Please select a query type"

        if (!formData.message.trim()) newErrors.message = "This field is required"

        if (!formData.consent) newErrors.consent = "To submit this form, please consent to being contacted"

        return newErrors

    }

    const onSubmit = (finalData: FormType) => {
        console.log("Form passed the validation: ", finalData)
        setAlert(true)

        resetForm()

        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const { errors, handleChange, handleSubmit, resetForm, values } = useForm({
        initialValues: initialValues,
        onSubmit: onSubmit,
        validate: validateRules
    })
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-182.5 bg-white p-6 sm:p-10 rounded-2xl shadow-sm text-grey-900 flex flex-col gap-6"
            >
                <h1 className="text-[32px] font-bold text-grey-900 tracking-tight leading-none mb-2">
                    Contact Us
                </h1>

                {/* Name Fields (First Name & Last Name) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label
                            htmlFor="first-name"
                            className="block text-sm text-grey-900 mb-2 cursor-pointer"
                        >
                            First Name <span className={errors.firstName ? "text-red" : "text-green-600"}>*</span>
                        </label>
                        <input
                            type="text"
                            id="first-name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            className={`w-full px-5 py-3 border rounded-lg text-grey-900 bg-white transition-all duration-200 hover:border-green-600 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none ${errors.firstName ? "border-red focus:border-red focus:ring-red" : "border-grey-500"
                                }`}
                        />
                        {errors.firstName && <p className="text-red text-sm mt-2 font-normal">{errors.firstName}</p>}
                    </div>

                    <div>
                        <label
                            htmlFor="last-name"
                            className="block text-sm text-grey-900 mb-2 cursor-pointer"
                        >
                            Last Name <span className={errors.lastName ? "text-red" : "text-green-600"}>*</span>
                        </label>
                        <input
                            type="text"
                            id="last-name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            className={`w-full px-5 py-3 border rounded-lg text-grey-900 bg-white transition-all duration-200 hover:border-green-600 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none ${errors.lastName ? "border-red focus:border-red focus:ring-red" : "border-grey-500"
                                }`}
                        />
                        {errors.lastName && <p className="text-red text-sm mt-2 font-normal">{errors.lastName}</p>}
                    </div>
                </div>

                {/* Email Address */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm text-grey-900 mb-2 cursor-pointer"
                    >
                        Email Address <span className={errors.email ? "text-red" : "text-green-600"}>*</span>
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className={`w-full px-5 py-3 border rounded-lg text-grey-900 bg-white transition-all duration-200 hover:border-green-600 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none ${errors.email ? "border-red focus:border-red focus:ring-red" : "border-grey-500"
                            }`}
                    />
                    {errors.email && <p className="text-red text-sm mt-2 font-normal">{errors.email}</p>}
                </div>

                {/* Query Type */}
                <fieldset className="border-none p-0 m-0">
                    <legend className="block text-sm text-grey-900 mb-3 font-normal">
                        Query Type <span className={errors.query ? "text-red" : "text-green-600"}>*</span>
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <label
                            htmlFor="general-enquiry"
                            className={`flex items-center gap-3 px-5 py-3.5 border rounded-lg cursor-pointer transition-all duration-200 ${values.query === "General Enquiry"
                                ? "border-green-600 bg-green-200"
                                : "border-grey-500 bg-white hover:border-green-600"
                                }`}
                        >
                            <input
                                type="radio"
                                name="query"
                                id="general-enquiry"
                                value="General Enquiry"
                                checked={values.query === "General Enquiry"}
                                onChange={handleChange}
                                className="accent-green-600 h-5 w-5 cursor-pointer"
                            />
                            <span className="text-grey-900 font-normal select-none">General Enquiry</span>
                        </label>

                        <label
                            htmlFor="support-request"
                            className={`flex items-center gap-3 px-5 py-3.5 border rounded-lg cursor-pointer transition-all duration-200 ${values.query === "Support Request"
                                ? "border-green-600 bg-green-200"
                                : "border-grey-500 bg-white hover:border-green-600"
                                }`}
                        >
                            <input
                                type="radio"
                                name="query"
                                id="support-request"
                                value="Support Request"
                                checked={values.query === "Support Request"}
                                onChange={handleChange}
                                className="accent-green-600 h-5 w-5 cursor-pointer"
                            />
                            <span className="text-grey-900 font-normal select-none">Support Request</span>
                        </label>
                    </div>
                    {errors.query && <p className="text-red text-sm mt-2 font-normal">{errors.query}</p>}
                </fieldset>

                {/* Message */}
                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm text-grey-900 mb-2 cursor-pointer"
                    >
                        Message <span className={errors.message ? "text-red" : "text-green-600"}>*</span>
                    </label>
                    <textarea
                        name="message"
                        id="message"
                        value={values.message}
                        onChange={handleChange}
                        className={`w-full min-h-30 px-5 py-3 border rounded-lg text-grey-900 bg-white transition-all duration-200 hover:border-green-600 focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none resize-y ${errors.message ? "border-red focus:border-red focus:ring-red" : "border-grey-500"
                            }`}
                    ></textarea>
                    {errors.message && <p className="text-red text-sm mt-2 font-normal">{errors.message}</p>}
                </div>

                {/* Consent Checkbox */}
                <div>
                    <div className="flex items-start gap-4 mt-2 mb-2">
                        <input
                            type="checkbox"
                            name="consent"
                            id="consent"
                            checked={values.consent}
                            onChange={handleChange}
                            className="accent-green-600 h-4.5 w-4.5 mt-1 cursor-pointer"
                        />
                        <label
                            htmlFor="consent"
                            className="text-sm text-grey-900 select-none cursor-pointer leading-normal"
                        >
                            I consent to being contacted by the team <span className={errors.consent ? "text-red" : "text-green-600"}>*</span>
                        </label>
                    </div>
                    {errors.consent && <p className="text-red text-sm mt-1 font-normal">{errors.consent}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-4 mt-2 bg-green-600 text-white font-bold rounded-lg hover:bg-[#064e43] active:scale-[0.98] transition-all duration-200 text-base cursor-pointer shadow-sm"
                >
                    Submit
                </button>
            </form>
            {alert && <Alert onClose={() => setAlert(false)} />}

        </>
    )
}