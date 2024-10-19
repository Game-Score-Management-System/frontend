// import Image from "next/image";

'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link";
import SignersFooter from '../ui/components/SignersFooter';
import { Divider } from '@nextui-org/react';


export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  return (
    <main className="text-[#fcfcfb] w-full min-h-screen md:grid md:grid-cols-[3fr,2fr]">
      <article className="hidden md:block relative">
        <img src="/bg.jpg" className="object-cover w-full h-full absolute backdrop-brightness-90" alt="Background Image" />
      </article>
      <article className="p-6 flex justify-center items-center flex-col w-full min-h-screen gap-5 relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-custom-gradient after:-z-10">
        <img src="/bg3.jpg" className="md:hidden object-cover w-full h-full absolute top-0 left-0" alt="Mobile background Image" />

        <p className="absolute right-0 top-0 p-4 text-sm md:px-10 px-10 pb-28">
          <span className="opacity-35 mr-1">
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}
          </span>
          <Link className=" font-bold" href={isLogin ? "/register" : "/login"}>
            {isLogin ? "Regístrate" : "Inicia Sesión"}
          </Link>
        </p>

        <div className="max-w-xl w-full md:px-10 px-3 z-10 mt-10">
          <h1 className="text-3xl md:text-5xl font-bold w-full leading-normal uppercase ">
            {isLogin ? "Inicia Sesión" : "Regístrate"}
          </h1>
          {children}
          <Divider className="my-5" />
          <SignersFooter />
        </div>
      </article >
    </main >
  )
}