import {MainLayout} from "@/components/layouts/MainLayout";
import {Back} from "@/components/ui/Back";
import {useAuth} from "@/hooks/useAuth";
import {useRouter} from "next/router";
import Image from "next/image";

const Profile = () => {
    const router = useRouter()
    const {user} = useAuth()
    return (
        <MainLayout title={"Профиль"}>
            <Back/>
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16 relative">
                <svg onClick={() => router.push("profile/edit")} xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                     className="w-6 h-6 cursor-pointer hover:w-8 hover:h-8 transition-all absolute top-2 left-2 lg:top-10 lg:left-0 dark:text-white">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <div className={"flex items-center justify-center"}>
                    {user?.avatarUrl
                        ? <label
                            className="relative inline-flex items-center justify-center w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:bg-gray-300 transition-all">
                            <Image className="rounded w-36 h-36"
                                 src={`${process.env.SERVER_URL}${user?.avatarUrl}`}
                                 alt="Extra large avatar"
                            width={100} height={100}/>
                        </label>
                        : <label
                            className="relative inline-flex items-center justify-center w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <span
                                className="font-medium text-gray-600 dark:text-gray-300">{user?.name.slice(0, 1)}{user?.surname.slice(0, 1)}</span>
                        </label>
                    }
                </div>
                <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white flex justify-center">
                    {user?.name}
                </h2>
                <p className="mb-4 text-xl font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white flex justify-center">{user?.email}</p>
            </div>
        </MainLayout>
    )
}
export default Profile