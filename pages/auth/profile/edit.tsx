import {TextField} from "@/components/ui/Form-components/TextField";
import {emailValidation, nameValidation, passwordValidation, surnameValidation} from "@/utils/validation";
import {ButtonForm} from "@/components/ui/Form-components/ButtonForm";
import {useState} from "react";
import {useAuth} from "@/hooks/useAuth";
import {instance} from "@/api/api.interceptors";
import {toast} from "react-toastify";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {IUpdateResponse} from "@/store/user/user.interface";
import {updateProfile} from "@/store/user/user.actions";
import {MainLayout} from "@/components/layouts/MainLayout";
import {Back} from "@/components/ui/Back";
import Image from "next/image";

const Edit = () => {
    const [imageUrl, setImageUrl] = useState("");
    const {user, isLoading} = useAuth()

    const handleChangeFile = async (event: any) => {
        try {
            const formData = new FormData();
            formData.append("image", event.target.files[0]);
            const {data} = await instance.post("/upload", formData);
            setImageUrl(data.url);
        } catch (err) {
            toast.error("Ошибка при загрузке файла");
        }
    };

    const {
        handleSubmit,
        control,
        formState: {isValid}
    } = useForm<IUpdateResponse>({
        defaultValues: {
            name: user?.name,
            surname: user?.surname,
            phone: user?.surname,
            avatarUrl: user?.avatarUrl,
            email: user?.email,
            password: ""
        },
        mode: "onChange"
    });

    const {errors} = useFormState({
        control
    })

    const onSubmit: SubmitHandler<IUpdateResponse> = async ({name, avatarUrl, surname, phone, email, password}) => {
        try {
            await updateProfile({
                name,
                surname,
                phone,
                avatarUrl,
                email,
                password
            })
            toast.success("Профиль успешно обновлен");
        } catch (err) {
            toast.error("Ошибка. Попробуйте позже")
        }
    }
    return (
        <MainLayout title={"Профиль"}>
            <Back/>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div
                    className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg dark:bg-gray-700">
                    <div className="mt-3">
                        <div className="mt-2 text-center sm:text-left">
                            <h4 className="text-lg font-medium text-gray-800 text-center dark:text-white">
                                Изменить
                            </h4>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                                {/*Фото*/}
                                <div className={"m-auto flex items-center justify-center mt-5"}>
                                    {!imageUrl
                                        ? <div>
                                            <label
                                                className="cursor-pointer relative inline-flex items-center justify-center w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:bg-gray-300 transition-all">
                                                <input className={"hidden"} id="avatar" type="file"
                                                       onChange={(e) => handleChangeFile(e)}/>
                                                <span
                                                    className="font-medium text-gray-600 dark:text-gray-300">{user?.name.slice(0, 1)}{user?.surname.slice(0, 1)}</span>
                                            </label>

                                        </div>
                                        : <div className={"relative"}>
                                            <div
                                                className={"inline-flex items-center justify-center w-36 h-36 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 hover:bg-gray-300 transition-all"}>
                                                <Image className="rounded w-36 h-36"
                                                       src={`${process.env.SERVER_URL}${imageUrl}`}
                                                       alt="Extra large avatar"
                                                       width={100} height={100}/>
                                            </div>
                                            <svg onClick={() => setImageUrl("")}
                                                 xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 24 24" strokeWidth="1.5"
                                                 stroke="currentColor"
                                                 className="w-5 h-5 absolute top-0 right-0 cursor-pointer">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                            </svg>
                                        </div>
                                    }
                                </div>
                                {/*Имя*/}
                                <TextField
                                    name={"name"}
                                    type={"text"}
                                    control={control}
                                    validation={nameValidation}
                                    label={"Имя"}
                                    placeholder={"Иван"}
                                    error={errors.name}
                                    id={"name"}
                                />
                                {/*Фамилия*/}
                                <TextField
                                    name={"surname"}
                                    type={"text"}
                                    control={control}
                                    validation={surnameValidation}
                                    label={"Фамилия"}
                                    placeholder={"Иванов"}
                                    error={errors.surname}
                                    id={"surname"}
                                />
                                {/*Телефон*/}
                                <TextField
                                    name={"phone"}
                                    type={"phone"}
                                    control={control}
                                    validation={surnameValidation}
                                    label={"Телефон"}
                                    placeholder={"+7"}
                                    error={errors.phone}
                                    id={"phone"}
                                />
                                {/*Почта*/}
                                <TextField
                                    name={"email"}
                                    type={"email"}
                                    control={control}
                                    validation={emailValidation}
                                    label={"Почта"}
                                    placeholder={"@"}
                                    error={errors.email}
                                    id={"email"}
                                />
                                {/*Пароль*/}
                                <TextField
                                    name={"password"}
                                    type={"password"}
                                    control={control}
                                    validation={passwordValidation}
                                    label={"Пароль"}
                                    placeholder={"******"}
                                    error={errors.password}
                                    id={"password"}
                                />
                                <ButtonForm isLoading={isLoading} isValid={isValid} label={"Изменить"}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}
export default Edit