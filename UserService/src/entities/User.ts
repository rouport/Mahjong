import { defineEntity, p, BaseEntity } from '@mikro-orm/core';
import { UserRole } from '../services/TokenService/token.js';

const UserSchema = defineEntity({
  name: 'User',
  extends: BaseEntity,
  properties: {
    uuid: p.uuid().primary().defaultRaw('gen_random_uuid()'),
    fname: p.string(),
    lname: p.string(),
    email: p.string().unique(),
    password: p.string(),
    username: p.string().unique(),
    role: p.enum(UserRole).default('user')
  },
});

export class User extends UserSchema.class {}
UserSchema.setClass(User);