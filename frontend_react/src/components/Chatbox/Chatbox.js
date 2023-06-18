import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import styles from './Chatbox.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets';
import useViewport from '~/hooks/useViewport';
import { MOBILE_VIEWPORT_PX } from '~/utils/constant-var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import * as thirdPartyService from '~/services/thirdApi';

var stompClient = null;

const cx = classNames.bind(styles);

const optionList = [
    {
        name: 'one',
        label: 'Tôi thắc mắc về sản phẩm',
    },
    {
        name: 'two',
        label: 'Tôi cần tư vấn về vấn đề khác',
    },
];

const Chatbox = () => {
    const [publicChats, setPublicChats] = useState([]);
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState('CHATROOM');
    const [userData, setUserData] = useState({
        username: '',
        receiverName: '',
        connected: false,
        message: '',
    });

    const handleValue = (event) => {
        const { value, name } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const registerUser = () => {
        const socket = new SockJS('http://localhost:8080/api/ws');
        stompClient = over(socket);
        stompClient.connect({}, onConnected, onError);
    };

    const onConnected = () => {
        const newVisitorFetch = async () => {
            const reponse = await thirdPartyService.getIpUser();
            setUserData({ ...userData, connected: true, username: reponse.ipString });
            stompClient.subscribe('/chatroom/public', onPublicMessageReceived);
            stompClient.subscribe(`/user/${reponse.ipString}/private`, onPrivateMessageReceived);
            userJoin(reponse.ipString);
        };
        newVisitorFetch();
    };
    const onError = (err) => {
        console.log(err);
        console.log("Error connect websocket");
    };

    const userJoin = (username) => {
        var chatMessage = {
            senderName: username,
            status: 'JOIN',
            message: 2,
        };
        stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
    };

    const onPublicMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        console.log(payloadData);
        switch (payloadData.status) {
            case 'JOIN':
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case 'MESSAGE':
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    };

    const onPrivateMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        if (!privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);

            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    };

    const sendPublicMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: 'MESSAGE',
            };
            stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: '' });
        }
    };
    const sendPrivateMessage = () => {
        if (stompClient) {
            let chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: 'MESSAGE',
            };
            if (userData.username != tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, message: '' });
        }
    };

    const viewPort = useViewport();
    const isMobile = viewPort.width <= MOBILE_VIEWPORT_PX;

    console.log(userData);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('background-wrap')}>
                <div className={cx('cart-wrap')}>
                    <img
                        style={{ objectFit: 'cover' }}
                        className={cx('rounded', 'image')}
                        width="60"
                        height="60"
                        src={images.logo}
                        alt=""
                    />
                    <p className="fs-3 text-white my-2">
                        <span>XANH Auto xin chào!👋</span>
                    </p>
                    <p className="text-white">Bạn đang cần hỗ trợ về vấn đề gì? Chat ngay với chúng tôi nhé!</p>
                </div>
            </div>
            <div className={cx('chat-wrap')}>
                {userData.connected ? (
                    <div className="chat-box">
                        {/* <div className="member-list">
              <ul>
                <li
                  onClick={() => setTab("CHATROOM")}
                  className={`member ${tab === "CHATROOM" && "active"}`}
                >
                  Chatroom
                </li>
  
                {[...privateChats.keys()].map((name, index) => (
                  <li
                    onClick={() => {
                      setTab(name);
                    }}
                    className={`member ${tab === name && "active"}`}
                    key={index}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div> */}

                        {/* separate */}
                        {tab === 'CHATROOM' && (
                            <div className="chat-content">
                                <ul className="chat-messages">
                                    {publicChats.map((chat, index) => (
                                        <li
                                            className={`message ${chat.senderName === userData.username && 'self'}`}
                                            key={index}
                                        >
                                            {chat.senderName !== userData.username && (
                                                <div className="avatar">{chat.senderName}</div>
                                            )}
                                            <div className="message-data">{chat.message}</div>
                                            {chat.senderName === userData.username && (
                                                <div className="avatar self">{chat.senderName}</div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <div className="send-message">
                                    <input
                                        type="text"
                                        className="input-message"
                                        name="message"
                                        placeholder="enter public message"
                                        value={userData.message}
                                        onChange={handleValue}
                                    />
                                    <button type="button" className="send-button" onClick={sendPublicMessage}>
                                        Send
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* separate */}
                        {tab !== 'CHATROOM' && (
                            <div className="chat-content">
                                <ul className="chat-messages">
                                    {[...privateChats.get(tab)].map((chat, index) => (
                                        <li
                                            className={`message ${chat.senderName === userData.username && 'self'}`}
                                            key={index}
                                        >
                                            {chat.senderName !== userData.username && (
                                                <div className="avatar">{chat.senderName}</div>
                                            )}
                                            <div className="message-data">{chat.message}</div>
                                            {chat.senderName === userData.username && (
                                                <div className="avatar self">{chat.senderName}</div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <div className="send-message">
                                    <input
                                        type="text"
                                        className="input-message"
                                        name="message"
                                        placeholder={`enter private message for ${tab}`}
                                        value={userData.message}
                                        onChange={handleValue}
                                    />
                                    <button type="button" className="send-button" onClick={sendPrivateMessage}>
                                        Send
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={cx('start-chat')}>
                        <div className="h-30 p-4" style={{ userSelect: 'none' }}>
                            <select
                                className={`form-select wm-20 ${isMobile ? 'w-50' : ''}`}
                                name="message"
                                onChange={handleValue}
                            >
                                {optionList.map((item) => (
                                    <option value={item.label} key={item.name}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button className={cx('ms-4', 'btn-connect')} type="button" onClick={registerUser}>
                            <FontAwesomeIcon style={{ fontSize: '1.1rem' }} className="me-2" icon={faPaperPlane} /> Bắt
                            đầu trò chuyện
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chatbox;
