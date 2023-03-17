import {useEffect, useState} from "react";

export const CookiesConsentPopup = () => {
    const [consentGiven, setConsentGiven] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookiesConsent');
        if (consent) {
            setConsentGiven(true);
        }
    }, []);

    const handleConsent = () => {
        localStorage.setItem('cookiesConsent', 'true');
        setConsentGiven(true);
    };

    return !consentGiven ? (
        <div
            className="fixed bottom-0 left-0 right-0 bg-gray-200 text-gray-800 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm md:text-base md:mr-4">
                Мы используем Cookies, чтобы улучшить ваше взаимодействие с нашим сайтом.
            </p>
            <button
                className="bg-white text-gray-800 px-4 py-2 rounded-md mt-4 md:mt-0"
                onClick={handleConsent}
            >
                Я согласен
            </button>
        </div>
    ) : null
};