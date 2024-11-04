// I need to create a yup validation when a admin creates a score, the score should be a number between 0 and 1000, the game should be a string and the userId should be a string.

// The form should have a select input to choose the user, an input to write the score and an input to write the game.

import * as yup from 'yup';

export const createScoreFormSchema = yup.object().shape({
  userId: yup.string(),
  score: yup
    .number()
    .required('La puntuación es obligatoria')
    .min(0, 'La puntuación no puede ser menor que 0')
    .max(1000, 'La puntuación no puede ser mayor que 1000'),
  game: yup.string().required('El nombre del juego es obligatorio')
});
