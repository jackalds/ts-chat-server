import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const MessageSchema = new mongoose.Schema(
  {
    conversation_id: {
      type: String,
      required: true,
    },
    sender_id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

MessageSchema.plugin(uniqueValidator);

export default mongoose.model('Messages', MessageSchema);
