import React, { useEffect } from 'react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

export function WalletConnection() {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();

    useEffect(() => {
        // Set loading state while fetching proof payload
        tonConnectUI.setConnectRequestParameters({ state: 'loading' });

        const setupTonConnect = async () => {
            try {
                // In a real app, fetch this from your backend
                const dummyProofPayload = 'dummy_proof_payload';

                tonConnectUI.setConnectRequestParameters({
                    state: 'ready',
                    value: { tonProof: dummyProofPayload },
                });
            } catch (error) {
                // Remove loader if there's an error
                tonConnectUI.setConnectRequestParameters(null);
            }
        };

        setupTonConnect();
    }, [tonConnectUI]);

    useEffect(() => {
        if (wallet?.connectItems?.tonProof && 'proof' in wallet.connectItems.tonProof) {
            // In a real app, verify the proof on your backend
            console.log('Proof received:', wallet.connectItems.tonProof.proof);
        }
    }, [wallet]);

    return (
        <div className='flex items-center space-x-4'>
            <TonConnectButton />
            {wallet && (
                <span className='text-sm text-green-600 font-medium'>
                    Connected: {wallet.account.address.slice(0, 6)}...{wallet.account.address.slice(-4)}{' '}
                    {/* {wallet.account.address} */}
                </span>
            )}
        </div>
    );
}
