import { Types, Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  name: string,
  email: string,
  phone: string,
  role: string,
  password?: string,
  picture?: string,
  otp?: string,
  otpExpiry?: Date,
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'landlord', 'tenant'], default: 'tenant' },
  password: { type: String, required: function() {} },
  otp: String,  
  otpExpiry: Date
}, { 
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
      delete ret.otp;
      delete ret.otpExpiry;
      return ret;
    }
  } 
});

const User = model<IUser>('User', userSchema);

export default User;