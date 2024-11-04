'use client';
import toast from "react-hot-toast";
import { Input } from "@nextui-org/react";
import { RegisterFormValidationSchema } from "@/app/ui/schemas/registerForm.schema";
import { useState } from "react";
import useForm from "@/app/ui/hooks/useForm";
import { useRouter } from 'next/navigation';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { inputWrapperClasses } from "@lib/utils";
import AppButton from "@/app/ui/components/AppButton";
import { iniciarSesion, registrar } from "@/app/lib/actions/actions";
import { useAppDispatch } from "@/app/ui/hooks/useStore";
import { login } from "@/store/slices/userSlice";


export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();


  const onRegister = async () => {
    const user = {
      email: values.email,
      name: values.name,
      lastname: values.lastname,
      password: values.password,
    }

    const promiseRegister = async () => {
      await registrar('credential', user);
      const tokenLogin = await iniciarSesion('credential', { email: user.email, password: user.password });
      dispatch(login({ token: tokenLogin }));

    }

    try {
      setLoading(true);
      await toast.promise(
        promiseRegister(),
        { loading: 'Registrando...', success: () => <b>¡Bienvenido!</b>, error: (e) => <b>{e.message}</b> }
      );
      router.push('/dashboard/leaderboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

  }

  const { values, errors, handleSubmit, handleChange } = useForm(
    { email: '', name: '', lastname: '', password: '', confirmPassword: '' },
    RegisterFormValidationSchema,
    onRegister
  )

  const [isVisible, setIsVisible] = useState({
    password: false,
    confirmPassword: false,
  });

  const toggleVisibilityPassword = (passwordType: "password" | "confirmPassword") => {
    setIsVisible((prevState) => ({
      ...prevState,
      [passwordType]: !prevState[passwordType],
    }));
  };



  return (
    <form className="flex justify-start w-full mt-4 md:mt-10 flex-col gap-5" onSubmit={handleSubmit} >
      <div className="grid md:grid-cols-2 gap-4 w-full mb-6 md:mb-0">
        <Input
          type="text"
          name="name"
          label="Ingresa tu nombre"
          placeholder="John"
          labelPlacement="outside"
          classNames={{ inputWrapper: inputWrapperClasses }}
          startContent={<UserCircleIcon className="size-6 text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          value={values.name}
          onChange={handleChange}
          isInvalid={!!errors.name}
          errorMessage={errors.name}
        />
        <Input
          type="text"
          name="lastname"
          label="Ingresa tu apellido"
          placeholder="Doe"
          labelPlacement="outside"
          classNames={{ inputWrapper: inputWrapperClasses }}
          startContent={<UserCircleIcon className="size-6 text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          value={values.lastname}
          onChange={handleChange}
          isInvalid={!!errors.lastname}
          errorMessage={errors.lastname}
        />
        <Input
          type="email"
          name="email"
          label="Ingresa tu correo electrónico"
          placeholder="you@example.com"
          labelPlacement="outside"
          className="md:col-span-2"
          classNames={{ inputWrapper: inputWrapperClasses }}
          startContent={<EnvelopeIcon className="size-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          value={values.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
          errorMessage={errors.email}
        />
        <Input
          type={isVisible.password ? "text" : "password"}
          name="password"
          label="Ingresa una contraseña"
          placeholder="********"
          labelPlacement="outside"
          classNames={{ inputWrapper: inputWrapperClasses }}
          endContent={
            <button className="focus:outline-none" type="button" onClick={() => toggleVisibilityPassword('password')}>
              {isVisible.password ? (
                <EyeSlashIcon className="size-5 text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeIcon className="size-5 text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          startContent={<LockClosedIcon className="size-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          value={values.password}
          onChange={handleChange}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
        />
        <Input
          type={isVisible.confirmPassword ? "text" : "password"}
          label="Confirma tu contraseña"
          name="confirmPassword"
          placeholder="********"
          labelPlacement="outside"
          classNames={{
            inputWrapper: inputWrapperClasses
          }}
          endContent={
            <button className="focus:outline-none" type="button" onClick={() => toggleVisibilityPassword('confirmPassword')}>
              {isVisible.confirmPassword ? (
                <EyeSlashIcon className="size-5 text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeIcon className="size-5 text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          startContent={<LockClosedIcon className="size-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          value={values.confirmPassword}
          onChange={handleChange}
          isInvalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
        />

      </div>
      <AppButton isLoading={loading} />
    </form>
  )
}