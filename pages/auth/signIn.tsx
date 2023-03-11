import {AuthLayout} from "@/components/layouts/AuthLayout";
import {ButtonForm} from "@/components/ui/form-components/ButtonForm";
import {TextField} from "@/components/ui/form-components/TextField";
import Link from "next/link";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {ISignInResponse} from "@/store/user/user.interface";
import {NextPage} from "next";
import {emailValidation, passwordValidation} from "@/utils/validation";
import {useAuth} from "@/hooks/useAuth";
import {useAuthRedirect} from "@/hooks/useAuth.redirect";
import {toast} from "react-toastify";
import {useActions} from "@/hooks/useActions";

const SignIn: NextPage = () => {
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
        } catch (err) {
            toast.error('Ошибка. Попробуйте позже')
        }
    }
    return (
        <AuthLayout title={"Вход"}>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
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
                                    <Link href={"auth/signUp"}
                                          className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        Зарегистрироваться
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </AuthLayout>
    )
}
export default SignIn