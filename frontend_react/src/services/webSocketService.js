import Stomp from "stompjs";

const WebSocketService = {
  stompClient: null,

  connect: () => {
    const socket = new WebSocket("ws://localhost:8080/ws");
    WebSocketService.stompClient = Stomp.over(socket);
    WebSocketService.stompClient.connect({}, () => {
      console.log("Connected to WebSocket");
    });
  },

  disconnect: () => {
    if (WebSocketService.stompClient) {
      WebSocketService.stompClient.disconnect();
      console.log("Disconnected from WebSocket");
    }
  },

  subscribe: (destination, callback) => {
    if (WebSocketService.stompClient) {
      WebSocketService.stompClient.subscribe(destination, (message) => {
        const payload = JSON.parse(message.body);
        callback(payload);
      });
    }
  },

  sendMessage: (destination, message) => {
    if (WebSocketService.stompClient) {
      WebSocketService.stompClient.send(destination, {}, JSON.stringify(message));
    }
  },
};

export default WebSocketService;