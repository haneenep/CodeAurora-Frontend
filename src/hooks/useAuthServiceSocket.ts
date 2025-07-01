import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
const SOCKET_URL = import.meta.env.VITE_NOTIFICATION_URL

export const useAuthServiceSocket = (userId?: string): Socket | null => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      query: { userId },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return socketRef.current;
};