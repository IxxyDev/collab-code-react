import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/shared";
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from "react-query/devtools";

const queryClient = new QueryClient();

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <App />
            </QueryClientProvider>
        </ChakraProvider>
    </React.StrictMode>);
