import { interval } from 'rxjs';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import constantObject from '~/utils/constant-var';

const { createContext, useState, useEffect } = require('react');

const ChatContext = createContext();

var stompClient = null;

export const ChatProvider = ({ children }) => {
    const [chatSection, setChatSection] = useState(new Map([]));

    const [chatting, setChatting] = useState(new Map());
    const [messageChatting, setMessageChatting] = useState(new Map());

    const [countMessageNotSeen, setCountMessageNotSeen] = useState(0);

    useEffect(() => {
        countNotSeenGroupMessage()
    }, [chatSection])

    console.log(4);
    console.log(chatSection);
    console.log(chatting);
    console.log(messageChatting);


    const connectWebsocket = () => {
        if (stompClient === null) {
            const socket = new SockJS(`${process.env.REACT_APP_DEFAULT_API_URL}ws`);
            stompClient = over(socket);
            stompClient.connect({}, onConnected, onError);
        }
    };

    const onConnected = () => {
        stompClient.subscribe(`/user/ADMIN/private`, onPrivateMessageReceived);
        fetchAllGroup('ADMIN');
    };

    const onError = (err) => {
        console.log(err);
        console.log('Error connect websocket');
    };

    const countNotSeenGroupMessage = () => {
        console.log(3);
        let count = 0;
        [...chatSection.values()].map((item) => {
            if (!item.seen) {
                count++;
            }
        });
        setCountMessageNotSeen(count);
    };

    const fetchAllGroup = (username) => {
        var chatMessage = {
            senderName: username,
            status: constantObject.FETCH_ALL_GROUP_CHAT_ADMIN,
            receiverName: username,
        };
        stompClient.send('/app/private-message-create', {}, JSON.stringify(chatMessage));
    };

    const onPrivateMessageReceived = (payload) => {
        let payloadData = JSON.parse(payload.body);
        if (payloadData.action === constantObject.FETCH_ALL_GROUP_CHAT_ADMIN) {
            payloadData.object.map((item) => {
                if (!chatSection.get(item.id)) {
                    chatSection.set(item.id, item);
                } else {
                    chatSection.get(item.id).lastMessage !== item.lastMessage && chatSection.set(item.id, item);
                }
            });
            setChatSection(new Map(chatSection));
        } else if (payloadData.action === constantObject.FETCH_ALL_MESSAGE_IN_GROUP) {
            const groupDTO = payloadData.object;
            messageChatting.set(groupDTO.id, groupDTO.messageDTOList);
            const isSeenChange = chatSection.get(groupDTO.id)
            isSeenChange.seen = true
            chatSection.set(groupDTO.id, isSeenChange)
            setChatSection(new Map(chatSection))
            setMessageChatting(new Map(messageChatting));
        } else if (payloadData.action === constantObject.NOTIFICATION_MESSAGE) {
            messageChatting.set(payloadData.groupId, payloadData.object);
            chatting.set(payloadData.groupId, { id: payloadData.groupId, senderName: payloadData.customerName });
            setChatting(new Map(chatting));
            setMessageChatting(new Map(messageChatting));
        }
        //  else if (payloadData.action === constantObject.SEND_MESSAGE) {
        //     messageChatting.set(payloadData.groupId, payloadData.object)
        //     setMessageChatting(new Map(messageChatting))
        // }
    };

    const sendChat = (value) => {
        stompClient.send('/app/private-message-create', {}, JSON.stringify(value));
        messageChatting.get(value.groupId).push(value);
        setMessageChatting(new Map(messageChatting));
    };

    const addChattingSection = (item) => {
        if (!chatting.get(item.id)) {
            var chatMessage = {
                senderName: 'ADMIN',
                status: constantObject.FETCH_ALL_MESSAGE_IN_GROUP,
                groupId: item.id,
                receiverName: 'ADMIN',
            };
            stompClient.send('/app/private-message-create', {}, JSON.stringify(chatMessage));
            chatting.set(item.id, item);
            setChatting(new Map(chatting));
        }
    };

    const removeChattingSection = (id) => {
        chatting.delete(id);
        setChatting(new Map(chatting));
    };

    const value = {
        section: chatSection,
        chattingSection: chatting,
        messageChatting,
        addChattingSection,
        removeChattingSection,
        connectWebsocket,
        fetchAllGroup,
        sendChat,
        countMessageNotSeen,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
