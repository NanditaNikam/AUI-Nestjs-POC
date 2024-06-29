import { Schema } from 'dynamoose';

export interface PostDdbKey {
  id: number;
}

export interface PostDdb extends PostDdbKey {
  Title: string;
  Description: string;
}

export const postSchema = new Schema({
  id: {
    type: Number,
    hashKey: true,
    required: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

export const postTableName = 'Posts';
