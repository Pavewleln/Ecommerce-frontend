import '@/assets/styles/globals.css'
import type {AppProps} from 'next/app'
import AuthProvider from "@/providers/auth-provider/AuthProvider";
import {store} from "@/store/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

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
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
            </Provider>
        </QueryClientProvider>
    )
}
