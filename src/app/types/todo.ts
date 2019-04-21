import { Comment } from './comment';

export interface Todo {
  __typename: "Todo";
  id: number;
  title: string;
  author: string;
  description: string;
  comments: Comment[];
}
