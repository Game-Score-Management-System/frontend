import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  selectedGame: string;
}

const INITIAL_STATE: GameState = {
  selectedGame: 'Pacman'
};

const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedGame(state, action: PayloadAction<string>) {
      state.selectedGame = action.payload;
    },
    clearSelectedGame(state) {
      state.selectedGame = '';
    }
  }
});

export const { setSelectedGame, clearSelectedGame } = gameSlice.actions;
export default gameSlice.reducer;
