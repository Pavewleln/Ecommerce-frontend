import {emailValidation, passwordValidation} from "@/utils/validation";
import {ButtonForm} from "@/components/ui/Form-components/ButtonForm";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {TextField} from "@/components/ui/Form-components/TextField";
import {CheckBox} from "@/components/ui/Form-components/CheckBox";
import {ISignInResponse} from "@/store/user/user.interface";
import {AuthLayout} from "@/components/layouts/AuthLayout";
import {useAuthRedirect} from "@/hooks/useAuthRedirect";
import {useActions} from "@/hooks/useActions";
import {useAuth} from "@/hooks/useAuth";
import {toast} from "react-toastify";
import {NextPage} from "next";
import Link from "next/link";

const SignIn: NextPage = () => {
    const {login} = useActions()
    const {isLoading} = useAuth()

    // редирект если человек уже авторизован(данные о человеке уже есть)
    useAuthRedirect()

    // настройка
    const {handleSubmit, control, formState: {isValid}} = useForm<ISignInResponse>({
        defaultValues: {
            email: "",
            password: "",
            isAdmin: false
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })
    const onSubmit: SubmitHandler<ISignInResponse> = async (loginData) => {
        try {
            await login(loginData)
        } catch (err) {
            toast.error('Ошибка. Попробуйте позже')
        }
    }
    return (
        <AuthLayout title={"Вход"}>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Войти
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                {/*Номер телефона*/}
                <TextField
                    error={errors.email}
                    control={control}
                    name={"email"}
                    type={"email"}
                    validation={emailValidation}
                    label={"Почта"}
                    placeholder={"@"}
                    id={"email"}
                />
                {/*Пароль*/}
                <TextField
                    control={control}
                    error={errors.password}
                    name={"password"}
                    type={"password"}
                    validation={passwordValidation}
                    label={"Пароль"}
                    placeholder={"******"}
                    id={"password"}
                />
                <CheckBox
                    name={"isAdmin"}
                    type={"checkbox"}
                    label={"Я продавец"}
                    id={"isAdmin"}
                    control={control}/>
                <ButtonForm isLoading={isLoading} isValid={isValid} label={"Войти"}/>
                <Link href={"signUp"}
                      className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-center flex justify-center">
                    Еще нет аккаунта ?
                </Link>
            </form>
        </AuthLayout>
    )
}
export default SignIn