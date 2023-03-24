import Link from "next/link";
import { useState } from "react";
import { LogoutPopup } from "@/components/ui/Popups/LogoutPopup";

export const Footer = () => {
    // навигация по подвалу
    const navigation: Array<{ href: string; label: string }> = [
        { href: "/", label: "Главная" },
        { href: "/auth/profile", label: "Профиль" },
        { href: "/support", label: "Поддержка" }
        // {href: "/logout", label: "Выйти"}
    ];
    // Модальное окно logout
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <footer className="p-4 bg-white rounded-lg flex-col-reverse shadow flex items-center justify-between p-6 dark:bg-gray-800 sm:flex-row mt-10">
            <span className="text-sm text-gray-500 text-center dark:text-gray-400 m-2">
                © 2023{" "}
                <a
                    target={"_blank"}
                    href="https://github.com/Pavewleln"
                    className="hover:underline"
                >
                    Pavel Kulikov
                </a>
            </span>
            <ul className="flex flex-wrap items-center justify-center mb-3 text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
                {navigation.map(({ href, label }) => (
                    <li key={href}>
                        <Link href={href} className="hover:underline m-3">
                            {label}
                        </Link>
                    </li>
                ))}
                <li>
                    <button
                        className="hover:underline m-3"
                        onClick={() => setShowLogoutModal(true)}
                    >
                        Выйти
                    </button>
                </li>
            </ul>
            {/*Logout*/}
            <LogoutPopup
                showModal={showLogoutModal}
                setShowModal={setShowLogoutModal}
            />
        </footer>
    );
};
