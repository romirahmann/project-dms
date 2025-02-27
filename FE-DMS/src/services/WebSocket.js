import { io } from "socket.io-client";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Set();
    this.url = "http://192.168.9.192:3000"; // Ganti sesuai dengan backend
  }

  connect() {
    if (!this.socket) {
      this.socket = io(this.url, { transports: ["websocket"] });

      this.socket.on("connect", () => {
        console.log("WebSocket Connected");
      });

      this.socket.on("user_update", (data) => {
        console.log("Received user update:", data);
        this.listeners.forEach((callback) => callback(data));
      });

      this.socket.on("disconnect", () => {
        console.log("WebSocket Disconnected, attempting to reconnect...");
      });

      this.socket.on("connect_error", (error) => {
        console.error("WebSocket Error:", error);
      });
    }
  }

  send(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    } else {
      console.warn("WebSocket not connected, cannot send message");
    }
  }

  addListener(callback) {
    this.listeners.add(callback);
  }

  removeListener(callback) {
    this.listeners.delete(callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

const websocketService = new WebSocketService();
export default websocketService;
