import {emailValidation, nameValidation, passwordValidation, surnameValidation} from "@/utils/validation";
import {ButtonForm} from "@/components/ui/Form-components/ButtonForm";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {TextField} from "@/components/ui/Form-components/TextField";
import {ISignUpResponse} from "@/store/user/user.interface";
import {AuthLayout} from "@/components/layouts/AuthLayout";
import {useAuthRedirect} from "@/hooks/useAuthRedirect";
import {useActions} from "@/hooks/useActions";
import {useAuth} from "@/hooks/useAuth";
import {toast} from "react-toastify";
import {NextPage} from "next";
import Link from "next/link";
import {CheckBox} from "@/components/ui/Form-components/CheckBox";

const SignUp: NextPage = () => {
    const {register} = useActions()
    const {isLoading} = useAuth()

    // редирект если человек уже авторизован(данные о человеке уже есть)
    useAuthRedirect()

    // настройка
    const {
        handleSubmit,
        control,
        formState: {isValid}
    } = useForm<ISignUpResponse>({
        defaultValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            phone: '',
            isAdmin: false
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })

    const onSubmit: SubmitHandler<ISignUpResponse> = async (registerData) => {
        try {
            await register(registerData)
        } catch (err) {
            toast.error('Ошибка. Попробуйте позже')
        }
    };
    return (
        <AuthLayout title={"Регистрация"}>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Зарегистрироваться
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
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
                <CheckBox
                    name={"isAdmin"}
                    type={"checkbox"}
                    label={"Я продавец"}
                    id={"isAdmin"}
                    control={control}/>
                <ButtonForm isLoading={isLoading} isValid={isValid}
                            label={"Зарегистрироваться"}/>
                <Link href={"signIn"}
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-center flex justify-center">
                    Уже есть аккаунт?
                </Link>
            </form>
        </AuthLayout>
    )
}
export default SignUp