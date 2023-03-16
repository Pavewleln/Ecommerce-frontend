import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AuthProvider from "@/providers/auth-provider/AuthProvider";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from '@/store/store';
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {ThemeProvider} from "next-themes";
import type {AppProps} from 'next/app';
import {Provider} from "react-redux";
import '@/assets/styles/globals.css';

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
                <PersistGate persistor={persistor} loading={null}>
                    <ThemeProvider enableSystem={true} attribute={"class"}>
                        <AuthProvider>
                            <Component {...pageProps} />
                            <ToastContainer/>
                        </AuthProvider>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </QueryClientProvider>
    )
}
