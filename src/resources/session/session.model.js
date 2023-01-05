import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      unique: true,
      required: true,
    },
    /*  lastVisit: {
      type: Date,
      required: true,
    }, */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    expireAt: { type: Date, expires: 11 },
  },
  { timestamps: true }
);

//sessionSchema.path('lastVisit').index({ expires: '1m' });
//sessionSchema.index({ lastVisit: 1 }, { expireAfterSeconds: 5 });
//sessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 20 });

const Session = mongoose.model('Session', sessionSchema);

export default Session;
