import express from 'express';

import {
  addMemberToConversation,
  createConversation,
  getConversationById,
  getConversationBetween,
  getConversationsByUserId,
} from '../../controllers/conversation-controller.js';

const router = express.Router();

// create a conversation
// POST /api/conversations/:memberIds
router.post('/:memberIds', createConversation);

// get all conversations for a single user
// GET /api/conversations/user/:userId
router.get('/user/:userId', getConversationsByUserId);

// get conversations between two specific users
// GET /api/conversations/between/:userA/:userB
router.get('/between/:memberIds', getConversationBetween);

// get conversation by id
// GET /api/conversations/:conversationId
router.get('/:conversationId', getConversationById);

// add member to an existing conversation
// PATCH /api/conversations/:conversationId/members/:memberId
router.patch('/:conversationId/members/:memberId', addMemberToConversation);

export default router;
