import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { createServer } from 'node:http';
import connectDB from './config/db.js';
import { initSocket } from './socket.js';

import authRoutes from './routes/api/auth.js';
import userRoutes from './routes/api/users.js';
import conversationRoutes from './routes/api/conversations.js';
import messageRoutes from './routes/api/messages.js';

// Load environment variables
config();
connectDB();

const app = express();
const server = createServer(app);

const io = initSocket(server);

app.use(cors());
app.use(json());

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('join conversation', (conversationId: string) => {
    if (typeof conversationId === 'string' && conversationId) {
      socket.join(conversationId);
    }
  });

  socket.on('leave conversation', (conversationId: string) => {
    if (typeof conversationId === 'string' && conversationId) {
      socket.leave(conversationId);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

// Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server + Socket.IO running on port ${PORT}`),
);
