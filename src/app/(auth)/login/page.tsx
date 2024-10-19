'use client';
import { inputWrapperClasses } from "@lib/utils";
import useForm from "@hooks/useForm";
import { useAppDispatch } from "@hooks/useStore";
import { LoginFormValidationSchema } from "@schemas/loginForm.schema";
import { login } from "@/store/slices/userSlice";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onLogin = async () => {
    console.log('iniciando sesión', values);

    const simulaEspera = async () => {
      return await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    }

    dispatch(login({
      email: values.email,
      token: '123456',
    }));

    await toast.promise(
      simulaEspera(),
      { loading: 'Iniciando sesión...', success: () => <b>¡Bienvenido!</b>, error: () => <b>¡Error al iniciar sesión!</b> }
    );

    router.push('/dashboard');
  }

  const { values, errors, validForm, handleSubmit, handleChange } = useForm(
    { email: 'juang20133@gmail.com', password: '123456' },
    LoginFormValidationSchema,
    onLogin
  )

  return (
    <form className="flex justify-start w-full mt-4 md:mt-10 flex-col gap-5" onSubmit={handleSubmit} >
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 flex-col">
        <Input
          type="email"
          label="Ingresa tu correo"
          name="email"
          placeholder="you@example.com"
          labelPlacement="outside"
          className="flex-1"
          classNames={{ inputWrapper: inputWrapperClasses }}
          startContent={<EnvelopeIcon className="size-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          value={values.email}
          isInvalid={!!errors.email}
          errorMessage={errors.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          label="Ingresa tu contraseña"
          name="password"
          placeholder="********"
          labelPlacement="outside"
          className="flex-1"
          classNames={{ inputWrapper: inputWrapperClasses }}
          startContent={<LockClosedIcon className="size-5 text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          value={values.password}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
          onChange={handleChange}
        />
      </div>
      <Button
        type="submit"
        className={`
          ${validForm === false ? 'cursor-not-allowed' : ''} 
          bg-gradient-to-t from-[#1b56f0] to-[#457aff] text-white font-bold rounded-xl md:p-4 md:py-7 p-3 w-full text-sm md:text-lg hover:scale-105 transition duration-200 ease-in-out uppercase
        `}
      >
        Continuar
      </Button>
    </form>
  )
}