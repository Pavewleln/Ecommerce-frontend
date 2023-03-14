import {emailValidation, passwordValidation} from "@/utils/validation";
import {ButtonForm} from "@/components/ui/form-components/ButtonForm";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {TextField} from "@/components/ui/form-components/TextField";
import {ISignInResponse} from "@/store/user/user.interface";
import {AuthLayout} from "@/components/layouts/AuthLayout";
import {useAuthRedirect} from "@/hooks/useAuthRedirect";
import {useActions} from "@/hooks/useActions";
import {useAuth} from "@/hooks/useAuth";
import {toast} from "react-toastify";
import {NextPage} from "next";
import Link from "next/link";

const SignIn: NextPage = () => {
    // редирект если человек уже авторизован(данные о человеке уже есть)
    useAuthRedirect()
    // настройка
    const {login} = useActions()
    const {isLoading} = useAuth()
    // const [login, {
    //     data: token,
    //     isLoading: isLoadingLogin,
    //     isSuccess: isLoginSuccess,
    //     isError: isLoginError,
    //     error: loginError
    // }] = useLoginMutation()

    const {handleSubmit, control, formState: {isValid}} = useForm<ISignInResponse>({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })

    // Если успешно
    // useEffect(() => {
    //     if (isLoginSuccess && token) {
    //         dispatch(setToken({token}))
    //         setTimeout(() => {
    //             router.push('/')
    //         }, 1000)
    //         toast.success("Вы успешно авторизованы!")
    //     }
    // }, [isLoginSuccess])

    // Если ошибка
    // useEffect(() => {
    //     if (isLoginError) {
    //         toast.error((loginError as any).data.message)
    //     }
    // }, [isLoginError])

    const onSubmit: SubmitHandler<ISignInResponse> = async (loginData) => {
        try {
            await login(loginData)
            toast.success("Вы успешно авторизовались")
        } catch (err) {
            toast.error('Ошибка. Попробуйте позже')
        }
    }
    return (
        <AuthLayout title={"Вход"}>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
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
                <ButtonForm isLoading={isLoading} isValid={isValid} label={"Войти"}/>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Еще нет аккаунта?
                    <Link href={"signUp"}
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Зарегистрироваться
                    </Link>
                </p>
            </form>
        </AuthLayout>
    )
}
export default SignIn