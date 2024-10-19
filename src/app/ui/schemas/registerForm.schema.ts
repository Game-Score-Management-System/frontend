import * as yup from 'yup';

export const RegisterFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es requerido')
    .max(20, 'El nombre no puede tener más de 20 caracteres'),
  lastname: yup
    .string()
    .required('El apellido es requerido')
    .max(20, 'El apellido no puede tener más de 20 caracteres'),
  email: yup
    .string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es requerido'),
  password: yup
    .string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: yup.string().required('La confirmación de contraseña es requerida')
});
