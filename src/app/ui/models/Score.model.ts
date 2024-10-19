import { User } from './User.model';

export interface Score {
  id: string;
  userId: string;
  game: string;
  score: number;
  createdAt: Date | string;
  updatedAt: null;
  user: User;
}
