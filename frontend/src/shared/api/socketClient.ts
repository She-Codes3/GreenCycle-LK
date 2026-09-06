import { io, type Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL, {
      autoConnect: false,
      transports: ['websocket'],
      auth: (cb) => cb({ token: localStorage.getItem('gc_token') }),
    });
  }
  return socket;
}

export function connectSocket(): Socket {
  const client = getSocket();
  if (!client.connected) client.connect();
  return client;
}

export function disconnectSocket(): void {
  socket?.disconnect();
  socket = null;
}
