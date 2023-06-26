import { faMinus, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ChatSectionComp.module.scss';

import images from '~/assets';
import useChat from '~/hooks/useChat';
import constantObject from '~/utils/constant-var';


const cx = classNames.bind(styles);

const userData = {
    username: 'ADMIN',
};
var stompClient = null;

function ChatSectionComp() {
    const chatSection = useChat();
    const [chatValue, setChatValue] = useState(new Map());
    

    const chatContainerRef = useRef(new Map());

    useEffect(() => {
        chatContainerRef.current.get([...chatSection.chattingSection.keys()].pop())?.scrollIntoView();
    }, [chatSection.chattingSection, chatSection.messageChatting]);

    const sendChat = (id) => {
        if (chatValue.get(id) != '') {
            const value = {
                groupId: id,
                senderName: 'ADMIN',
                message: chatValue.get(id),
                status: constantObject.SEND_MESSAGE
            }
            chatSection.sendChat(value)
            chatValue.delete(id)
            setChatValue(new Map(chatValue))
        }
        setTimeout(() => {
            chatContainerRef.current.get(id)?.scrollIntoView();
        }, 0);
    };

    const handleKeyDown = (event, id) => {
        if (event.key === 'Enter') {
            sendChat(id);
        }
    };

    const compose = (e, id) => {
        chatValue.set(id, e.target.value);
        setChatValue(new Map(chatValue));
    };

    return (
        <div className={cx('chat_section')}>
            {[...chatSection.chattingSection.values()].map((item) => (
                <div key={item.id} className={cx('each_section')}>
                    <div className={cx('top_section')}>
                        <div className={cx('identity', 'd-flex')}>
                            <img
                                className="mx-2 my-2 rounded-circle"
                                width={40}
                                height={40}
                                src={images.avatarAno}
                                alt=""
                            />
                            <span className="ms-1">{item.customerName}</span>
                        </div>
                        <div className={cx('button_option')}>
                            <div className={cx('wrap_but', 'f-center-align ')}>
                                <FontAwesomeIcon icon={faMinus} />
                            </div>
                            <div onClick={() => chatSection.removeChattingSection(item.id)} className={cx('wrap_but', 'f-center-align ')}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('mid_section')}>
                        <ul className={cx('chat-messages')}>
                            {chatSection.messageChatting.get(item.id) && chatSection.messageChatting.get(item.id).map((chat, index) => (
                                <li
                                    className={cx(`message`, `${chat.senderName === userData.username && 'self'}`)}
                                    key={index}
                                >
                                    {chat.senderName !== userData.username && (
                                        <img
                                            className="mx-2 my-2 rounded-circle"
                                            width={33}
                                            height={33}
                                            src={images.avatarAno}
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
                        </ul>
                        <div ref={(ref) => chatContainerRef.current.set(item.id, ref)} />
                    </div>
                    <div className={cx('bot_section', 'f-center-align')}>
                        <div className={cx('chat_form')}>
                            <input
                                type="text"
                                placeholder="Aa"
                                spellCheck={false}
                                value={chatValue.get(item.id) || ''}
                                onChange={(e) => compose(e, item.id)}
                                onKeyDown={(e) => handleKeyDown(e, item.id)}
                            />
                        </div>
                        <div className={cx('button_send')}>
                            <button
                                type="button"
                                // onMouseOver={() => setOver(true)}
                                // onMouseLeave={() => setOver(false)}
                                className={cx('btn-search')}
                                onClick={() => sendChat(item.id)}
                            >
                                <FontAwesomeIcon
                                    // style={over ? { color: 'black' } : {}}
                                    icon={faPaperPlane}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChatSectionComp;
