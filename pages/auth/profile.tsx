import {UpdateProfilePopup} from "@/components/ui/Popups/UpdateProfilePopup";
import {MainLayout} from "@/components/layouts/MainLayout";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/router";
import {useState} from "react";

const Profile = () => {
    const [showModal, setShowModal] = useState(false);
    const {back} = useRouter()
    const auth = useAuth()
    return (
        <MainLayout title={"Профиль"}>
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 relative">
                <svg onClick={() => setShowModal(true)} xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                     className="w-6 h-6 cursor-pointer hover:w-8 hover:h-8 transition-all absolute top-2 left-2 lg:top-10 lg:left-0 dark:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div className={"flex items-center justify-center"}>
                    {auth?.user?.avatarUrl
                        ? <label
                            className="relative inline-flex items-center justify-center w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:bg-gray-300 transition-all">
                            <img className="rounded w-36 h-36"
                                 src={`${process.env.SERVER_URL}${auth?.user?.avatarUrl}`}
                                 alt="Extra large avatar"/>
                        </label>
                        : <label
                            className="relative inline-flex items-center justify-center w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <span
                                className="font-medium text-gray-600 dark:text-gray-300">{auth?.user?.name.slice(0, 1)}{auth?.user?.surname.slice(0, 1)}</span>
                        </label>
                    }
                </div>
                <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white flex justify-center">
                    {auth?.user?.name}
                </h2>
                <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white flex justify-center">{auth?.user?.email}</p>
                <div className="flex items-center space-x-4">
                    <button onClick={() => back()} type="button"
                            className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                        </svg>
                        Назад
                    </button>
                </div>
            </div>
            <UpdateProfilePopup showModal={showModal} setShowModal={setShowModal}/>
        </MainLayout>
    )
}
export default Profile