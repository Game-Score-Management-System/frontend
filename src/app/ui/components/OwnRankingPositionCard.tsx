import { Image } from "@nextui-org/react";

export default function OwnRankingPositionCard({ title, profilePicture, username, score, position }: { title?: string, profilePicture?: string, username?: string, score?: number, position?: number }) {
  return (
    <div className=" relative flex flex-col md:flex-row gap-6 md:gap-20 items-center justify-between p-6 md:p-12 pb-8 overflow-hidden transition-all border-3 rounded-lg border-white/80 bg-black/80 group-hover:border-white w-full">
      <div className="absolute z-10 w-16 h-16 md:w-24 md:h-24 bg-green-500 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 z-10 w-16 h-16 md:w-24 md:h-24 bg-cyan-300 rounded-full opacity-50 blur-3xl"></div>
      <small className="absolute left-0 right-0 block w-full font-bold text-center uppercase top-2">{title}</small>

      <div className="z-10 flex flex-col items-center justify-center">
        <Image
          isBlurred
          isZoomed
          src={profilePicture ?? 'https://robohash.org/21'}
          alt='User'
          className="md:w-24 md:h-24 object-cover"
        >
        </Image>
        <p className="mt-3">{username ?? '@Juan1234'}</p>
      </div>
      <div className="z-10 flex flex-col items-center justify-center text-xl md:text-3xl">
        <strong className="text-4xl md:text-6xl text-green-300">{score ?? 400}</strong>
        <strong className="text-base md:text-lg font-light uppercase opacity-70">Puntos</strong>
      </div>
      {
        position && (
          <div className="z-10 flex flex-col items-center justify-center text-xl md:text-3xl">
            <strong className="text-4xl md:text-6xl text-[#50b9e2]">{position}º</strong>
            <strong className="text-base md:text-lg font-light uppercase opacity-70">Posición</strong>
          </div>
        )
      }
    </div>
  )
}