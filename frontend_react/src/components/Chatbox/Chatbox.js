import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import styles from './Chatbox.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets';
import useViewport from '~/hooks/useViewport';
import constantObject from '~/utils/constant-var';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import * as thirdPartyService from '~/services/thirdApi';
import { compareIfGreaterThanLocalDateTime1Day } from '~/utils/stringUtils';

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

const Chatbox = ({chatActive, handleActive }) => {
    const [privateChats, setPrivateChats] = useState([]);

    const chatContainerRef = useRef(null);

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

    const [chatValue, setChatValue] = useState('');

    useEffect(() => {
        if (localStorage.getItem(constantObject.RECENTLY_CONNECTION) && !userData.connected) {
            registerUser();
        }
        setTimeout(() => {
            chatContainerRef.current?.scrollIntoView();
        }, 0);
    }, [chatActive]);


    const registerUser = () => {
        const socket = new SockJS(`${process.env.REACT_APP_DEFAULT_API_URL}ws`);
        stompClient = over(socket);
        stompClient.connect({}, onConnected, onError);
    };

    // console.log(JSON.parse(getCookie(constantObject.RECENTLY_CONNECTION)));

    const onConnected = () => {
        const newVisitorFetch = async () => {
            const reponse = await thirdPartyService.getIpUser();
            const now = new Date();
            //Create a localDateTime looklike in Java
            const localDateTimeNow = {
                year: now.getFullYear(),
                month: now.getMonth() + 1, // Month start from 0 so need + 1
                day: now.getDate(),
                hour: now.getHours(),
                minute: now.getMinutes(),
                second: now.getSeconds(),
            };
            
            if (
                localStorage.getItem(constantObject.RECENTLY_CONNECTION) &&
                JSON.parse(localStorage.getItem(constantObject.RECENTLY_CONNECTION)).ip === reponse.ipString
            ) {
                const localStorageObject = JSON.parse(localStorage.getItem(constantObject.RECENTLY_CONNECTION));
                const uniqueIp = localStorageObject.ip + localStorageObject.key;
                setUserData({
                    ...userData,
                    connected: true,
                    username: uniqueIp,
                });
                if (compareIfGreaterThanLocalDateTime1Day(localStorageObject.localDateTime) > 0) { 
                    // if datetime in Local > 1 day ago => not expired 1 day local
                    stompClient.subscribe(`/user/${uniqueIp}/private`, onPrivateMessageReceived);
                    userJoin(uniqueIp, constantObject.RECENTLY_CONNECTION);
                } else {
                    stompClient.subscribe(`/user/${uniqueIp}/private`, onPrivateMessageReceived);
                    localStorageObject.localDateTime = localDateTimeNow;
                    localStorage.setItem(constantObject.RECENTLY_CONNECTION, JSON.stringify(localStorageObject));
                    userJoin(uniqueIp, '');
                }
            } else {
                let key = '_' + Math.random().toString(36).substring(2, 6);
                const ipUnique = reponse.ipString + key;
                setUserData({
                    ...userData,
                    connected: true,
                    username: ipUnique,
                });
                stompClient.subscribe(`/user/${ipUnique}/private`, onPrivateMessageReceived);
                localStorage.setItem(
                    constantObject.RECENTLY_CONNECTION,
                    JSON.stringify({ ip: reponse.ipString, localDateTime: localDateTimeNow, key }),
                );
                userJoin(ipUnique, '');
            }
        };
        newVisitorFetch();
    };

    const onError = (err) => {
        console.log(err);
        console.log('Error connect websocket');
    };

    const userJoin = (username, action) => {
        let recentlyTimeConnect = '';
        if (action === constantObject.RECENTLY_CONNECTION) {
            recentlyTimeConnect = JSON.parse(localStorage.getItem(constantObject.RECENTLY_CONNECTION)).localDateTime;
            // console.log(recentlyTimeConnect);
        }
        const now = new Date();
        const localDateTime = {
            year: now.getFullYear(),
            month: now.getMonth() + 1, // Month start from 0 so need + 1
            day: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds(),
        };
        var chatMessage = {
            senderName: username,
            status: action || 'JOIN',
            receiverName: 'ADMIN',
            recentlyTime: recentlyTimeConnect || localDateTime,
            message: userData.message || 'Tôi thắc mắc về sản phẩm',
        };
        setPrivateChats([...privateChats, chatMessage]);
        stompClient.send('/app/private-message-create', {}, JSON.stringify(chatMessage));
    };

    const onPrivateMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        if (payloadData.action === constantObject.RECENTLY_CONNECTION) {
            setPrivateChats([...privateChats, ...payloadData.object]);
        // } else if (payloadData.action === constantObject.SEND_MESSAGE) {
        //     setPrivateChats([...privateChats, ...payloadData.object]);
        } else if (payloadData.action === constantObject.NOTIFICATION_MESSAGE) {
            setPrivateChats([...privateChats, ...payloadData.object]);
            handleActive()
        }
    };

    const sendChat = () => {
        if (chatValue != '') {
            const chatValueSend = {
                senderName: userData.username,
                receiverName: 'ADMIN',
                message: chatValue,
                status: constantObject.SEND_MESSAGE,
            };
            setPrivateChats([...privateChats, chatValueSend]);
            stompClient.send('/app/private-message-create', {}, JSON.stringify(chatValueSend));
            setTimeout(() => {
                chatContainerRef.current?.scrollIntoView();
            }, 0);
            setChatValue('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendChat();
        }
    };

    const viewPort = useViewport();
    const isMobile = viewPort.width <= constantObject.MOBILE_VIEWPORT_PX;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('background-wrap', `${userData.connected && 'quarter'}`)}>
                <div className={cx('cart-wrap')}>
                    <img
                        style={{ objectFit: 'cover' }}
                        className={cx('rounded', 'image')}
                        width="60"
                        height="60"
                        src={images.logo}
                        alt=""
                    />
                    {!userData.connected && (
                        <>
                            <p className="fs-3 text-white my-2">
                                <span>XANH Auto xin chào!👋</span>
                            </p>
                            <p className="text-white">Bạn đang cần hỗ trợ về vấn đề gì? Chat ngay với chúng tôi nhé!</p>
                        </>
                    )}
                </div>
            </div>
            <div className={cx('chat-wrap')}>
                {userData.connected ? (
                    <>
                        <div className={cx('mid_section')}>
                            {userData.connected && (
                                <div className="f-center-align">
                                    <p
                                        className="px-5 py-2"
                                        style={{ fontSize: '.8rem', maxWidth: '270px', textAlign: 'center' }}
                                    >
                                        Quý khách vui lòng chờ trong giây lát, chúng tôi sẽ liên hệ lại ngay
                                    </p>
                                </div>
                            )}
                            <ul className={cx('chat-messages')}>
                                {privateChats &&
                                    privateChats.map((chat, index) => (
                                        <li
                                            className={cx(
                                                `message`,
                                                `${chat.senderName === userData.username && 'self'}`,
                                            )}
                                            key={index}
                                        >
                                            {chat.senderName !== userData.username && (
                                                <img
                                                    className="mx-2 my-2 rounded-circle"
                                                    width={33}
                                                    height={33}
                                                    src={images.logo}
                                                    alt=""
                                                />
                                            )}
                                            <div
                                                className={cx(
                                                    'message-data',
                                                    `${chat.senderName !== userData.username && 'not_self'}`,
                                                )}
                                            >
                                                {chat.message}
                                            </div>
                                        </li>
                                    ))}
                                <div ref={chatContainerRef} />
                            </ul>
                        </div>
                        <div className={cx('bot_section', 'f-center-align')}>
                            <div className={cx('chat_form')}>
                                <input
                                    type="text"
                                    placeholder="Aa"
                                    spellCheck={false}
                                    value={chatValue}
                                    onChange={(e) => setChatValue(e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e)}
                                />
                            </div>
                            <div className={cx('button_send')}>
                                <button
                                    type="button"
                                    // onMouseOver={() => setOver(true)}
                                    // onMouseLeave={() => setOver(false)}
                                    className={cx('btn-search')}
                                    onClick={() => sendChat()}
                                >
                                    <FontAwesomeIcon
                                        // style={over ? { color: 'black' } : {}}
                                        icon={faPaperPlane}
                                    />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={cx('start-chat')}>
                        <div className="h-30 p-4" style={{ userSelect: 'none' }}>
                            <select
                                className={`form-select wm-20 ${isMobile ? 'w-100' : ''}`}
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
