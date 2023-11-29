import mongoose from 'mongoose';

const { Schema } = mongoose;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // The token will expire after 3600 seconds (1 hour)
  },
});

const Token = mongoose.model('Token', tokenSchema);

export default Token;