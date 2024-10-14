import { User } from './User.model';

export interface Leaderboard {
  score: number;
  game: string;
  user: User;
}
