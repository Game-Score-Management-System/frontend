'use client';
import { Input, Button } from "@nextui-org/react";
import { RegisterFormValidationSchema } from "@/app/ui/schemas/registerForm.schema";
import { useState } from "react";
import useForm from "@/app/ui/hooks/useForm";
import { useRouter } from 'next/navigation';

import toast from "react-hot-toast";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserCircleIcon } from "@heroicons/react/24/outline";


export default function Register() {
  const router = useRouter();

  const onRegister = async () => {

    const simulaEspera = async () => {
      return await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }

    await toast.promise(
      simulaEspera(),
      { loading: 'Registrando...', success: () => <b>¡Bienvenido!</b>, error: () => <b>¡Error al iniciar sesión!</b> }
    );

    router.push('/dashboard');
  }

  const { values, errors, validForm, handleSubmit, handleChange } = useForm(
    { email: '', name: '', lastName: '', password: '', confirmPassword: '' },
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

  const inputWrapperClasses = [
    "shadow-xl",
    "bg-default-200/50",
    "dark:bg-default/60",
    "backdrop-blur-xl",
    "backdrop-saturate-200",
    "hover:bg-default-200/70",
    "dark:hover:bg-default/70",
    "group-data-[focus=true]:bg-default-200/50",
    "dark:group-data-[focus=true]:bg-default/60",
  ]

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
          name="lastName"
          label="Ingresa tu apellido"
          placeholder="Doe"
          labelPlacement="outside"
          classNames={{ inputWrapper: inputWrapperClasses }}
          startContent={<UserCircleIcon className="size-6 text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          value={values.lastName}
          onChange={handleChange}
          isInvalid={!!errors.lastName}
          errorMessage={errors.lastName}
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
      <Button
        type="submit"
        className={`
          ${validForm === false && 'cursor-not-allowed'} 
          bg-gradient-to-t from-[#1b56f0] to-[#457aff] text-white font-bold rounded-xl md:p-4 md:py-7 p-3 w-full text-sm md:text-lg hover:scale-105 transition duration-200 ease-in-out uppercase
        `}
      >
        Continuar
      </Button>
    </form>
  )
}