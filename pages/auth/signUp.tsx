import {emailValidation, nameValidation, passwordValidation, surnameValidation} from "@/utils/validation";
import {ButtonForm} from "@/components/ui/form-components/ButtonForm";
import {SubmitHandler, useForm, useFormState} from "react-hook-form";
import {TextField} from "@/components/ui/form-components/TextField";
import {ISignUpResponse} from "@/store/user/user.interface";
import {AuthLayout} from "@/components/layouts/AuthLayout";
import {useAuthRedirect} from "@/hooks/useAuthRedirect";
import {useActions} from "@/hooks/useActions";
import {useAuth} from "@/hooks/useAuth";
import {toast} from "react-toastify";
import {NextPage} from "next";
import Link from "next/link";

const SignUp: NextPage = () => {
    useAuthRedirect()
    // настройка
    const {register} = useActions()
    const {isLoading} = useAuth()
    // const [register, {
    //     isLoading: isLoadingRegister,
    //     data: token,
    //     isSuccess: isRegisterSuccess,
    //     isError: isRegisterError,
    //     error: registerError
    // }] = useRegisterMutation()

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
            phone: ''
        },
        mode: "onChange"
    });
    const {errors} = useFormState({
        control
    })

    // Если успешно
    // useEffect(() => {
    //     if (isRegisterSuccess && token) {
    //         dispatch(setToken({token}))
    //         setTimeout(() => {
    //             router.push('/')
    //         }, 1000)
    //         toast.success("Вы успешно авторизованы!")
    //     }
    // }, [isRegisterSuccess])

    // Если ошибка
    // useEffect(() => {
    //     if (isRegisterError) {
    //         toast.error((registerError as any).data.message)
    //     }
    // }, [isRegisterError])

    const onSubmit: SubmitHandler<ISignUpResponse> = async (registerData) => {
        try {
            await register(registerData)
            toast.success("Вы успешно зарегистрировались")
        } catch (err) {
            toast.error('Ошибка. Попробуйте позже')
        }
    };
    return (
        <AuthLayout title={"Регистрация"}>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
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
                <ButtonForm isLoading={isLoading} isValid={isValid}
                            label={"Зарегистрироваться"}/>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Уже есть аккаунт?
                    <Link href={"signIn"}
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Войти
                    </Link>
                </p>
            </form>
        </AuthLayout>
    )
}
export default SignUp