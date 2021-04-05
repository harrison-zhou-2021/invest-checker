import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ToastProvider } from 'react-toast-notifications';
import { AppProvider } from './store/store';
import InvestApp from './components/InvestApp';

function App() {
    const queryClient = new QueryClient();
    return (
        <AppProvider>
            <ToastProvider>
                <QueryClientProvider client={queryClient}>
                    <InvestApp />
                </QueryClientProvider>
            </ToastProvider>
        </AppProvider>
    );
}

export default App;
