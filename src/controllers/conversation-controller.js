import Conversation from '../models/Conversation.js';
import { normalizeArray } from '../utils/utils.js';
import Users from '../models/Users.js';
import { getIO } from '../socket.js';

const withUsernames = async (conversation) => {
  const memberIds = conversation.memberIds;
  const users = await Users.find(
    { _id: { $in: memberIds } },
    { _id: 1, username: 1 },
  ).lean();

  const userMap = new Map(
    users.map((user) => [String(user._id), user.username]),
  );

  return {
    ...conversation.toObject(),
    usernames: memberIds.map((memberId) => userMap.get(memberId) ?? null),
  };
};

export const createConversation = async (req, res, next) => {
  try {
    const memberIds = normalizeArray(req.params.memberIds);
    console.log(memberIds);

    // check if conversation already exists
    const existingConversation = await Conversation.findOne({ memberIds });
    if (existingConversation) {
      // return the existing conversation
      res.status(200).json(existingConversation);
      return existingConversation;
    }

    // create new conversation
    const conversation = await Conversation.create({ memberIds });

    res.status(201).json(conversation);
    return conversation;
  } catch (error) {
    next(error);
  }
};

export const getConversationById = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const conversation = await Conversation.findById(conversationId, {
      _id: 1,
      memberIds: 1,
      createdAt: 1,
      updatedAt: 1,
    });

    if (!conversation) {
      res.status(404).json({ message: 'Conversation not found' });
      return;
    }

    const conversationWithUsername = await withUsernames(conversation);

    res.status(200).json(conversationWithUsername);
  } catch (error) {
    next(error);
  }
};

export const getConversationsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log('userId', userId);
    const conversations = await Conversation.find(
      { memberIds: userId },
      { _id: 1, memberIds: 1, createdAt: 1, updatedAt: 1 },
    );
    console.log('conversations', conversations);
    // add usernames to the conversations
    const conversationsWithUsername = await Promise.all(
      conversations.map(async (conversation) => {
        return await withUsernames(conversation);
      }),
    );

    res.json(conversationsWithUsername);
  } catch (error) {
    next(error);
  }
};

export const getConversationBetween = async (req, res, next) => {
  try {
    const memberIds = normalizeArray(req.params.memberIds);
    console.log('memberIds', memberIds);
    const conversation = await Conversation.findOne(
      { memberIds: { $all: memberIds, $size: 2 } },
      { _id: 1, memberIds: 1, createdAt: 1, updatedAt: 1 },
    );

    if (!conversation) {
      // create new conversation
      console.log('creating new conversation');
      const newConversation = await Conversation.create({ memberIds });
      const newConversationWithUsername = await withUsernames(newConversation);
      console.log(newConversationWithUsername._id);
      getIO().emit('conversation created', newConversationWithUsername._id);
      res.status(201).json(newConversationWithUsername);
      return;
    }

    const conversationWithUsername = await withUsernames(conversation);
    console.log('found conversation', conversationWithUsername);
    res.status(200).json(conversationWithUsername);
  } catch (error) {
    next(error);
  }
};

export const addMemberToConversation = async (req, res, next) => {
  try {
    const { conversationId, memberId } = req.params;

    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { $addToSet: { memberIds: memberId } },
      {
        returnDocument: 'after',
        projection: { _id: 1, memberIds: 1, createdAt: 1, updatedAt: 1 },
      },
    );

    if (!conversation) {
      res.status(404).json({ message: 'Conversation not found' });
      return;
    }

    const conversationWithUsername = await withUsernames(conversation);
    res.status(200).json(conversationWithUsername);
  } catch (error) {
    next(error);
  }
};
