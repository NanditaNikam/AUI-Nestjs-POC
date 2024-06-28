import { Schema } from 'dynamoose';

export interface UserDdbKey {
  id: number;
}

export interface UserDdb extends UserDdbKey {
  firstName: string;
  lastName: string;
  age: number;
}

export const userSchema = new Schema({
  id: {
    type: Number,
    hashKey: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

export const userTableName = 'Users';
