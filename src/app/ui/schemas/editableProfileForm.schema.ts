import * as yup from 'yup';

export const EditableProfileForm = yup.object().shape({
  name: yup.string().max(20, 'El nombre no puede tener más de 20 caracteres'),
  username: yup
    .string()
    .max(20, 'El nombre de usuario no puede tener más de 20 caracteres')
    .matches(
      /^[a-zA-Z0-9_@]+$/,
      'El nombre de usuario solo puede contener letras, números, guiones bajos y arroba'
    )
});
