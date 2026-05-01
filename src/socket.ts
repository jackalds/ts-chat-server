import type { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';

let io: Server | null = null;

export const initSocket = (server: HttpServer): Server => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.IO has not been initialized');
  }
  return io;
};
