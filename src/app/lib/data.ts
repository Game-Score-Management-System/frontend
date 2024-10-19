export const USERS_DATA = [
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
    name: 'John Doe',
    email: 'admin@domain.com',
    role: 'ADMIN',
    username: 'johndoe@',
    profilePicture: 'https://robohash.org/luis',
    createdAt: '2024-10-13T22:39:46.512Z',
    updatedAt: null,
    status: 1
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'USER',
    username: 'janesmith',
    profilePicture: 'https://robohash.org/jane',
    createdAt: '2024-10-14T10:15:30.000Z',
    updatedAt: '2024-10-14T10:15:30.000Z',
    status: 1
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa3',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'USER',
    username: 'alicejohnson',
    profilePicture: 'https://robohash.org/alice',
    createdAt: '2024-10-15T14:20:00.000Z',
    updatedAt: '2024-10-15T14:20:00.000Z',
    status: 1
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa4',
    name: 'Bob Brown',
    email: 'bob.brown@example.com',
    role: 'USER',
    username: 'bobbrown',
    profilePicture: 'https://robohash.org/bob',
    createdAt: '2024-10-16T18:45:15.000Z',
    updatedAt: '2024-10-16T18:45:15.000Z',
    status: 1
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa5',
    name: 'Charlie Davis',
    email: 'charlie.davis@example.com',
    role: 'USER',
    username: 'charliedavis',
    profilePicture: 'https://robohash.org/charlie',
    createdAt: '2024-10-17T20:30:45.000Z',
    updatedAt: '2024-10-17T20:30:45.000Z',
    status: 1
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: 'Eve White',
    email: 'eve.white@example.com',
    role: 'USER',
    username: 'evewhite',
    profilePicture: 'https://robohash.org/eve',
    createdAt: '2024-10-18T22:39:46.512Z',
    updatedAt: '2024-10-18T22:39:46.512Z',
    status: 1
  }
];

export const SCORE_DATA = [
  {
    id: '2c963f66afa6-5717-4562-b3fc-3fa85f51',
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
    game: 'Tetris',
    score: 500,
    createdAt: '2024-10-13T22:39:46.512Z',
    updatedAt: null
  },
  {
    id: '2c963f66afa6-5717-4562-b3fc-3fa85f52',
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
    game: 'Pac-Man',
    score: 750,
    createdAt: '2024-10-14T10:15:30.000Z',
    updatedAt: '2024-10-14T10:15:30.000Z'
  },
  {
    id: '2c963f66afa6-5717-4562-b3fc-3fa85f53',
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
    game: 'Super Mario',
    score: 1200,
    createdAt: '2024-10-15T14:20:00.000Z',
    updatedAt: '2024-10-15T14:20:00.000Z'
  },
  {
    id: '2c963f66afa6-5717-4562-b3fc-3fa85f54',
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa2',
    game: 'Space Invaders',
    score: 950,
    createdAt: '2024-10-16T18:45:15.000Z',
    updatedAt: '2024-10-16T18:45:15.000Z'
  },
  {
    id: '2c963f66afa6-5717-4562-b3fc-3fa85f55',
    userId: '3fa85f64-5717-4562-b3fc-2c963f66afa3',
    game: 'Donkey Kong',
    score: 1100,
    createdAt: '2024-10-17T20:30:45.000Z',
    updatedAt: '2024-10-17T20:30:45.000Z'
  }
];
