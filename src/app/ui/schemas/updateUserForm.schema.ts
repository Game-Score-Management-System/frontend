// Create a yup validation to a selectable role

import * as yup from 'yup';

export const updateUserFormSchema = yup.object().shape({
  role: yup.string().required('El rol es obligatorio')
});
