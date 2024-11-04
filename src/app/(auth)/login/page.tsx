'use client';
import { inputWrapperClasses } from "@lib/utils";
import useForm from "@hooks/useForm";
import { useRouter } from "next/navigation";
import { LoginFormValidationSchema } from "@schemas/loginForm.schema";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Input } from "@nextui-org/react";
import { iniciarSesion } from "@/app/lib/actions/actions";
import toast from "react-hot-toast";
import AppButton from "@/app/ui/components/AppButton";
import { useState } from "react";
import { useAppDispatch } from "@/app/ui/hooks/useStore";
import { login } from "@/store/slices/userSlice";


export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onLogin = async () => {
    try {
      setLoading(true);
      const tokenLogin = await toast.promise(
        iniciarSesion('credential', values),
        { loading: 'Iniciando sesión...', success: () => <b>¡Bienvenido!</b>, error: (e) => <b>{e.message}</b> }
      )

      dispatch(login({ token: tokenLogin }));

      router.push('/dashboard/leaderboard');
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }

  const { values, errors, handleSubmit, handleChange } = useForm(
    { email: 'juang20133@gmail.com', password: '12345678' },
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
      <AppButton isLoading={loading} />
    </form>
  )
}