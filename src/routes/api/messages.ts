import express from 'express';

import {
  createMessage,
  getMessagesByConversationId,
} from '../../controllers/message-controller.js';

const router = express.Router();

// create message
// POST /api/messages/:conversationId
router.post('/:conversationId', createMessage);

// get all messages for a conversation
// GET /api/messages/:conversationId
router.get('/:conversationId', getMessagesByConversationId);

export default router;
