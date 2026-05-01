import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ConversationSchema = new mongoose.Schema(
  {
    memberIds: {
      type: [String],
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

ConversationSchema.plugin(uniqueValidator);

export default mongoose.model('Conversation', ConversationSchema);
