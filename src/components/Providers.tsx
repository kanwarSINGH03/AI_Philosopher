"use client"
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactNode} from "react";

interface ProviderProps {
    children: ReactNode
}

export default function Providers({children} : ProviderProps) {

    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>

    );
}