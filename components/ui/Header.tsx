import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {Disclosure, Menu, Transition} from '@headlessui/react';
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";
import {LogoutPopup} from "./Popups/LogoutPopup";
import {classNames} from "@/utils/classNames";
import {FC, Fragment, useState} from "react";
import {useRouter} from "next/router";
import {useTheme} from "next-themes";
import Link from "next/link";
import {BasketPopup} from "@/components/ui/Popups/BasketPopup";

// Для темы
enum Theme {
    LIGHT = 'light',
    DARK = 'dark'
}

// Навигация
const navigation = [
    {name: 'Главная', href: '/', current: true}
]

export const Header: FC = () => {
    // Настройка темы
    const {systemTheme, theme, setTheme} = useTheme()
    const currentTheme = theme === 'system' ? systemTheme : theme

    const {pathname} = useRouter()

    // Модальное окно logout
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Модальное окно basket
    const [showBasketModal, setShowBasketModal] = useState(false);

    return (
        <div className={"relative"}>
            <Disclosure as="nav" className="bg-gray-800">
                {({open}) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/*Кнопка мобильного меню*/}
                                    <Disclosure.Button
                                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div
                                    className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    {/*Навигация 1070px*/}
                                    <div className="hidden sm:ml-3 sm:block">
                                        <div className="flex space-x-2">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {/*Дропдаун профиля*/}
                                    <Menu as="div" className="relative ml-3 z-50">
                                        <div className={"flex items-center"}>
                                            <Link href={"/products/favourites"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="1.5" stroke="currentColor"
                                                     className="mr-5 w-7 h-7 text-white cursor-pointer hover:text-blue-200 transition-all">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                                                </svg>
                                            </Link>
                                            <svg onClick={() => setShowBasketModal(!showBasketModal)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5"
                                                 stroke="currentColor"
                                                 className="mr-7 w-7 h-7 text-white cursor-pointer hover:text-blue-200 transition-all">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                                            </svg>
                                            <Menu.Button
                                                className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">Open user menu</span>
                                                <label
                                                    className="cursor-pointer relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:bg-gray-300 transition-all">
                                                        <span
                                                            className="font-medium text-gray-600 dark:text-gray-300"></span>
                                                </label>
                                            </Menu.Button>
                                            <div className={"ml-7"}>
                                                {currentTheme === Theme.DARK
                                                    ? <SunIcon className={"w-7 h-7"} role={"button"}
                                                               onClick={() => setTheme(Theme.LIGHT)}/>
                                                    : <MoonIcon className={"w-7 h-7 text-white"} role={"button"}
                                                                onClick={() => setTheme(Theme.DARK)}/>
                                                }
                                            </div>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    <Link
                                                        href={"/auth/profile"}
                                                        className={'block px-4 py-2 text-sm text-gray-700'}
                                                    >
                                                        Профиль
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <button onClick={() => setShowLogoutModal(true)}
                                                            className={'block px-4 py-2 text-sm text-gray-700 h-full max-h-full w-full flex justify-left'}
                                                    >
                                                        Выйти
                                                    </button>
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        {/*Мобильное меню*/}
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? ' text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            {/*Logout*/}
            <LogoutPopup showModal={showLogoutModal} setShowModal={setShowLogoutModal}/>

            {/*Basket*/}
            <BasketPopup showModal={showBasketModal} setShowModal={setShowBasketModal}/>
        </div>
    )
}