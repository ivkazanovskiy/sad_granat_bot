import mongoose, { Document, Types } from 'mongoose';
import { EDate, ETime } from '../types/date.type';
import { ERole, TUser } from '../types/user.type';

const subsSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      enum: EDate,
    },
    time: {
      type: String,
      enum: ETime,
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema<TUser>({
  tlgId: String,
  isAuthorized: { type: Boolean, default: false },
  subs: [subsSchema],
  role: {
    type: String,
    enum: ERole,
    default: ERole.user,
  },
});

export const User = mongoose.model<TUser>('User', userSchema);
export type UserDoc = Document<unknown, any, TUser> &
  TUser & {
    _id: Types.ObjectId;
  };
