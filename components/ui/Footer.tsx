import Link from "next/link";

export const Footer = () => {
    // навигация по подвалу
    const navigation: Array<{ href: string, label: string }> = [
        {href: "/", label: "Главная"},
        {href: "/profile", label: "Профиль"},
        {href: "/support", label: "Поддержка"},
        {href: "/logout", label: "Выйти"},
    ]
    return (
        <footer className="p-4 bg-white rounded-lg flex-col-reverse shadow flex items-center justify-between p-6 dark:bg-gray-800 sm:flex-row">
            <span className="text-sm text-gray-500 text-center dark:text-gray-400">© 2023
                <a target={"_blank"} href="https://github.com/Pavewleln" className="hover:underline">Kulikov Pavel</a>
            </span>
            <ul className="flex flex-wrap items-center justify-center mb-3 text-sm text-gray-500 dark:text-gray-400 sm:mb-0">
                {navigation.map(({href, label}) => (
                    <li key={href}>
                        <Link href={href} className="hover:underline m-3">{label}</Link>
                    </li>
                ))}
            </ul>
        </footer>

    )
}