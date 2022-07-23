import mongoose, { Document, Types } from 'mongoose';
import { ESubDate, ESubTime } from '../types/groups.type';
import { ERole, TUser } from '../types/user.type';

const subsSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      enum: ESubDate,
    },
    time: {
      type: String,
      enum: ESubTime,
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema<TUser>({
  tlgId: String,
  subs: [subsSchema],
  role: {
    type: String,
    enum: ERole,
  },
});

export const User = mongoose.model<TUser>('User', userSchema);
export type UserDoc = Document<unknown, any, TUser> &
  TUser & {
    _id: Types.ObjectId;
  };
