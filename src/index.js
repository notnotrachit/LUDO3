import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
    <TonConnectUIProvider
        manifestUrl='https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json'
        actionsConfiguration={{
            twaReturnUrl: 'https://t.me/ton_ludo_bot',
        }}
    >
        <App />
    </TonConnectUIProvider>
);
