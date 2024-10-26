import React, { useState, useContext, useEffect } from 'react';
import { SocketContext } from '../../../App';
import useInput from '../../../hooks/useInput';
import useKeyPress from '../../../hooks/useKeyPress';
import styles from './NameInput.module.css';
import { useTonWallet } from '@tonconnect/ui-react';

const NameInput = ({ isRoomPrivate, roomId }) => {
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
                    placeholder={wallet.account.address}
                    disabled
                    value={`${wallet.account.address.slice(4, 6)}...${wallet.account.address.slice(-4)}`}
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
