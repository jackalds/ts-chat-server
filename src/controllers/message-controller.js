import Messages from '../models/Messages.js';
import Users from '../models/Users.js';
import { getIO } from '../socket.js';

// add usernames to the messages
const withUsernames = async (messages) => {
  // get all unique sender ids
  const senderIds = [...new Set(messages.map((message) => message.sender_id))];
  // get all usernames from usersby sender ids
  const users = await Users.find(
    { _id: { $in: senderIds } },
    { _id: 1, username: 1 },
  ).lean();

  const userMap = new Map(
    users.map((user) => [String(user._id), user.username]),
  );

  return messages.map((message) => ({
    ...message,
    username: userMap.get(message.sender_id) ?? null,
  }));
};

// create a message
export const createMessage = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { senderId, content } = req.body;

    if (!senderId || !content?.trim()) {
      res.status(400).json({ message: 'senderId and content are required' });
      return;
    }

    const message = await Messages.create({
      conversation_id: conversationId,
      sender_id: senderId,
      content: content.trim(),
    });

    const [messageWithUsername] = await withUsernames([message.toObject()]);

    getIO()
      .to(message.conversation_id)
      .emit('chat message', messageWithUsername);

    res.status(201).json(messageWithUsername);
  } catch (error) {
    next(error);
  }
};

// get messages by conversation id
export const getMessagesByConversationId = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const messages = await Messages.find(
      { conversation_id: conversationId },
      { _id: 1, conversation_id: 1, sender_id: 1, content: 1, createdAt: 1 },
    ).lean();

    const messagesWithUsername = await withUsernames(messages);

    res.status(200).json(messagesWithUsername);
  } catch (error) {
    next(error);
  }
};
