import { useEffect, useState } from "react"

type AlertProps = {
    onClose: () => void
}

export default function Alert({ onClose }: AlertProps) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        const enterTimeout = setTimeout(() => setIsMounted(true), 10)

        const exitTimeout = setTimeout(() => setIsMounted(false), 2600)

        const closeTimeout = setTimeout(() => onClose(), 3000)

        return () => {
            clearTimeout(enterTimeout)
            clearTimeout(exitTimeout)
            clearTimeout(closeTimeout)
        }
    }, [onClose])

    return (
        <div
            className={`fixed left-1/2 -translate-x-1/2 bg-grey-900 text-white p-6 rounded-xl shadow-lg z-50 w-[90%] max-w-112.5 flex flex-col gap-2 transition-all duration-500 ease-out ${isMounted
                ? "top-6 opacity-100 pointer-events-auto"
                : "-top-24 opacity-0 pointer-events-none"
                }`}
        >
            <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none" viewBox="0 0 20 21">
                    <path fill="#fff" d="M14.28 7.72a.748.748 0 0 1 0 1.06l-5.25 5.25a.748.748 0 0 1-1.06 0l-2.25-2.25a.75.75 0 1 1 1.06-1.06l1.72 1.72 4.72-4.72a.75.75 0 0 1 1.06 0Zm5.47 2.78A9.75 9.75 0 1 1 10 .75a9.76 9.76 0 0 1 9.75 9.75Zm-1.5 0A8.25 8.25 0 1 0 10 18.75a8.26 8.26 0 0 0 8.25-8.25Z" />
                </svg>
                <p className="font-bold text-white text-base leading-none">Message Sent!</p>
            </div>
            <p className="text-green-200 text-sm font-normal leading-relaxed">
                Thanks for completing the form. We'll be in touch soon!
            </p>
        </div>
    )
}