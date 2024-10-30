import { Button } from '@nextui-org/react'

interface AppButtonProps {
  isLoading: boolean
}

export default function AppButton({ isLoading }: AppButtonProps) {
  return (
    <Button
      type="submit"
      isLoading={isLoading}
      className={`bg-gradient-to-t from-[#1b56f0] to-[#457aff] text-white font-bold rounded-xl md:p-4 md:py-7 p-3 w-full text-sm md:text-lg hover:scale-105 transition duration-200 ease-in-out uppercase`}
    >
      Continuar
    </Button>
  )
}