import { Schema } from 'dynamoose';

export const ArticleSchema = new Schema({
  slug: {
    hashKey: true,
    type: String,
  },
  title: String,
  body: String,
  tags: {
    type: Array,
    schema: [
      {
        type: String,
      },
    ],
  },
  likes: Number,
  createdAt: Date,
  updatedAt: Date,
});
