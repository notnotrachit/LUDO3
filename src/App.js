import React, { useEffect, useState, createContext } from 'react';
import { io } from 'socket.io-client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import Gameboard from './components/Gameboard/Gameboard';
import LoginPage from './components/LoginPage/LoginPage';
import { WalletConnection } from './components/WalletConnect';
import { Dices } from 'lucide-react';
import WebApp from '@twa-dev/sdk';

WebApp.ready();

export const PlayerDataContext = createContext();
export const SocketContext = createContext();

function App() {
    const [playerData, setPlayerData] = useState();
    const [playerSocket, setPlayerSocket] = useState();
    const [redirect, setRedirect] = useState();
    useEffect(() => {
        const socket = io(`https://tonback.loophole.site/`);
        socket.on('player:data', data => {
            data = JSON.parse(data);
            setPlayerData(data);
            if (data.roomId != null) {
                setRedirect(true);
            }
        });
        setPlayerSocket(socket);
    }, []);

    return (
        <div className='min-h-screen bg-gradient-to-b from-blue-100 to-blue-200'>
            <header className='bg-white shadow-md max-h-10 p-4 mb-8'>
                <div className='container mx-auto flex justify-between items-center'>
                    <div className='flex items-center space-x-2'>
                        <Dices className='w-8 h-8 text-blue-600' />
                        <h1 className='text-2xl font-bold text-gray-800'>TON Ludo</h1>
                    </div>
                    <WalletConnection />
                </div>
            </header>
            <SocketContext.Provider value={playerSocket}>
                <Router>
                    <Routes>
                        <Route
                            exact
                            path='/'
                            Component={() => {
                                if (redirect) {
                                    return <Navigate to='/game' />;
                                } else if (playerSocket) {
                                    return <LoginPage />;
                                } else {
                                    return (
                                        <ReactLoading type='spinningBubbles' color='white' height={667} width={375} />
                                    );
                                }
                            }}
                        ></Route>
                        <Route
                            path='/login'
                            Component={() => {
                                if (redirect) {
                                    return <Navigate to='/game' />;
                                } else if (playerSocket) {
                                    return <LoginPage />;
                                } else {
                                    return (
                                        <ReactLoading type='spinningBubbles' color='white' height={667} width={375} />
                                    );
                                }
                            }}
                        ></Route>
                        <Route
                            path='/game'
                            Component={() => {
                                if (playerData) {
                                    return (
                                        <PlayerDataContext.Provider value={playerData}>
                                            <Gameboard />
                                        </PlayerDataContext.Provider>
                                    );
                                } else {
                                    return <Navigate to='/login' />;
                                }
                            }}
                        ></Route>
                    </Routes>
                </Router>
            </SocketContext.Provider>
        </div>
    );
}

export default App;
