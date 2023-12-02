import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
const bcrypt = require('bcryptjs');

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    trim: true,
  })
  image: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
  })
  email: string;

  @Prop({
    // required:true,
    trim: true,
  })
  password: string;

  @Prop({
    minlength: 4,
  })
  id: Number;

  @Prop({
    default: false,
  })
  isAdmin: Boolean;

  @Prop({ type: [String] })
  tokens: String[];

  @Prop({
    type: String,
    default: 'local',
    enum: ['local', 'google', 'facebook'],
  })
  provider: string;

  @Prop({
    default:0
  })
  coins: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);

UsersSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

UsersSchema.methods.toJSON = function () {
  var obj = this.toObject();

  delete obj.password;
  delete obj.tokens;
  return obj;
};
