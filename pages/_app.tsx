import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from "@/providers/auth-provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {ThemeProvider} from "next-themes";
import type {AppProps} from 'next/app';
import {Provider} from "react-redux";
import '@/assets/styles/globals.css';
import {store} from "@/store/store";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

export default function App({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ThemeProvider enableSystem={true} attribute={"class"}>
                    <AuthProvider>
                        <Component {...pageProps} />
                        <ToastContainer/>
                    </AuthProvider>
                </ThemeProvider>
            </Provider>
        </QueryClientProvider>
    )
}
