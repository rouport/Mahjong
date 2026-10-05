import { defineEntity, p, BaseEntity } from '@mikro-orm/core';

const UserSchema = defineEntity({
  name: 'User',
  extends: BaseEntity,
  properties: {
    uuid: p.uuid().primary().defaultRaw('gen_random_uuid()'),
    fname: p.string(),
    lname: p.string(),
    email: p.string(),
    password: p.string(),
    username: p.string(),
  },
});

export class User extends UserSchema.class {}
UserSchema.setClass(User);