export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  username: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string | null;
  status: boolean;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
