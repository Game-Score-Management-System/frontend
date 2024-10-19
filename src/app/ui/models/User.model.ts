export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: Role;
  username: string;
  profilePicture: string;
  createdAt: string;
  updatedAt: string | null;
  status: boolean;
}

export interface UserEditable {
  name?: string;
  lastname?: string;
  username?: string;
  profilePicture?: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
