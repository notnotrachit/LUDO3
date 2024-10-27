import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '../../../App';
import useInput from '../../../hooks/useInput';
import useKeyPress from '../../../hooks/useKeyPress';
import styles from './NameInput.module.css';
import { useTonWallet } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';

WebApp.ready()


const NameInput = ({ isRoomPrivate, roomId }) => {
    console.log('NameInput');
    console.log(WebApp.initDataUnsafe?.user?.username);
    console.log("WebAppUser")
    const socket = useContext(SocketContext);
    const nickname = useInput('');
    const password = useInput('');
    const [isPasswordWrong, setIsPasswordWrong] = useState(false);
    const wallet = useTonWallet();

    const handleButtonClick = () => {
        socket.emit('player:login', { name: nickname.value, password: password.value, roomId: roomId });
    };

    useKeyPress('Enter', handleButtonClick);

    useEffect(() => {
        socket.on('error:wrongPassword', () => {
            setIsPasswordWrong(true);
        });
    }, [socket]);

    return (
        <div className={styles.container} style={{ height: isRoomPrivate ? '150px' : '100px' }}>
            <label htmlFor=''>
                UserID
                <input
                    placeholder={WebApp.initDataUnsafe?.user?.username}
                    disabled
                    value={`${WebApp.initDataUnsafe?.user?.username}`}
                    type='text'
                    {...nickname}
                />{' '}
            </label>
            {isRoomPrivate ? (
                <input
                    placeholder='Room password'
                    type='text'
                    {...password}
                    style={{ backgroundColor: isPasswordWrong ? 'red' : null }}
                />
            ) : null}
            <button onClick={handleButtonClick}>JOIN</button>
        </div>
    );
};

export default NameInput;
