import mongoose from 'mongoose';
import connection from '../../utils/connection.js';

const sessionSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  expire: { type: Number, default: Date.now() + 60 },
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
