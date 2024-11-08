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
