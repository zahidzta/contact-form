export type FormType = {
    firstName: string
    lastName: string
    email: string
    query: "General Enquiry" | "Support Request" | ""
    message: string
    consent: boolean
}

export type FormErrors = {
    [K in keyof FormType]?: string;
}