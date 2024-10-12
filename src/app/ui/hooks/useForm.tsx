import { useState } from "react";
import { ValidationError, AnySchema } from "yup";

// Definimos el tipo genérico T que representa los valores del formulario.
export default function useForm<T>(initialValues: T, validationSchema: AnySchema, onSubmit: () => void) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [validForm, setValidForm] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!name) throw new Error("Se debe agregar el atributo name en el input");
    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    if (name === "confirmPassword" && value !== (values as { password?: string }).password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Las contraseñas no coinciden",
      }));
      setValidForm(false);
      return;
    }

    try {
      await validationSchema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (err) {
      if (err instanceof ValidationError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: err.message,
        }));
        setValidForm(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await validationSchema.validate(values, { abortEarly: false });
      setValidForm(true);
      onSubmit();
      console.log("Formulario válido");
    } catch (err) {
      if (err instanceof ValidationError) {
        const formErrors: Partial<Record<keyof T, string>> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            formErrors[error.path as keyof T] = error.message;
          }
        });
        setErrors(formErrors);
      }
    }
  };

  return {
    values,
    errors,
    validForm,
    handleChange,
    handleSubmit,
  };
}
