import { interval } from 'rxjs';

const { createContext, useState, useEffect } = require('react');

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chatSection, setChatSection] = useState(new Map([
        [1, {id: 1, name: "Dũng", mes: "Hello!"}],
        [2, {id: 2, name: "Quang", mes: "hi!"}],
        [3, {id: 3, name: "Đạt", mes: "Sup!"}],
    ]));

    

    
    useEffect(() => {
        console.log(chatSection);
    }, [chatSection])


    // const addChatSection = (item) => {
    //     if (!chatSection.get(item.id)) {
    //         chatSection.set(item.id, item)
    //         setChatSection(new Map(chatSection))
    //     }
    // };

    // var onReduce = (id) => {
    //     const updatedItemList = cartProducts.map((item) => {
    //         if (item.id === id && item.quantity > 1) {
    //             item.quantity--;
    //         }
    //         return item;
    //     });
    //     setCartProducts(updatedItemList);
    //     localStorage.setItem("items", JSON.stringify(updatedItemList));
    // }

    // var onIncrease = (id) => {
    //     const updatedItemList = cartProducts.map((item) => {
    //         if (item.id == id) {
    //             // if(item.quantity < item.maxOrder){
    //                 item.quantity++
    //             // }else{
    //             //     errorToast("Vượt giới hạn order")
    //             // }
    //         }
    //         return item
    //     })
    //     setCartProducts(updatedItemList);
    //     localStorage.setItem("items", JSON.stringify(updatedItemList));
    // }

    // var onDelete = (id) => {
    //     const updatedItemList = cartProducts.filter((item) => item.id !== id);
    //     if (updatedItemList.length === 0) {
    //         localStorage.removeItem('items')
    //         setCartProducts(null)
    //     } else {
    //         setCartProducts(updatedItemList);
    //         localStorage.setItem("items", JSON.stringify(updatedItemList));
    //     }
    // }

    // var handleChange = (e, id) => {
    //     const inputValue = e.target.value;
    //     const updatedItemList = cartProducts.map((item) => {
    //         const newCount = isNaN(inputValue) ? item.quantity : Number(inputValue);
    //         if (item.id == id) {
    //             item.quantity = newCount
    //         }
    //         return item
    //     })
    //     setCartProducts(updatedItemList);
    //     localStorage.setItem("items", JSON.stringify(updatedItemList));
    // }

    // var getTotalCart = () => {
    //     let total = 0
    //     if(cartProducts != null){
    //         cartProducts.map((item) => {
    //             total += item.price * item.quantity
    //         })
    //     }
    //     return total
    // }

    // const getTotalQuantityCart = () => {
    //     let totalQuantity = 0
    //     cartProducts.map((item) => {
    //         totalQuantity += item.quantity
    //     })
    //     return totalQuantity
    // }

    // const deleteAllFromCart = () => {
    //     setCartProducts('')
    //     localStorage.removeItem('items')
    // }

    const value = {
        section: chatSection,
        // addChatSection,
        // onIncrease,
        // onReduce,
        // onDelete,
        // handleChange,
        // getTotalCart,
        // getTotalQuantityCart,
        // deleteAllFromCart
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
