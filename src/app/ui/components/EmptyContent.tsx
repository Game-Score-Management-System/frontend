import { Image } from "@nextui-org/react";

export default function EmptyContent({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center bg-transparent/40 rounded-full size-80 p-5">
      <Image
        src="/alien.png"
        alt="Imagen no encontro elementos"
        width={150}
        height={150}
      />
      <p className="text-center text-sn text-slate-100 mb-4">
        {message}
      </p>
    </div>
  )
}