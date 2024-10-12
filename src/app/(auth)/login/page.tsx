'use client';
import useForm from "@/app/ui/hooks/useForm";
import { LoginFormValidationSchema } from "@/app/ui/schemas/loginForm.schema";
import { MailIcon } from "@icons/MailIcon";
import { PasswordIcon } from "@icons/PasswordIcon";
import { Button, Input } from "@nextui-org/react";

export default function Login() {

  const onLogin = async () => {
    console.log('iniciando sesión', values);
  }

  const { values, errors, validForm, handleSubmit, handleChange } = useForm(
    { email: '', password: '' },
    LoginFormValidationSchema,
    onLogin
  )

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
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 flex-col">
        <Input
          type="email"
          label="Ingresa tu correo"
          name="email"
          placeholder="you@example.com"
          labelPlacement="outside"
          className="flex-1"
          classNames={{ inputWrapper: inputWrapperClasses }}
          startContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
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
          startContent={<PasswordIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          isInvalid={!!errors.password}
          errorMessage={errors.password}
          onChange={handleChange}
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