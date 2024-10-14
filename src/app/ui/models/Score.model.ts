import { User } from './User.model';

export interface Score {
  scoreId: string;
  userId: string;
  game: string;
  score: number;
  createdAt: Date;
  updatedAt: null;
  user: User;
}
