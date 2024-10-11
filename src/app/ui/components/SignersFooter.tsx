import { Button } from "@nextui-org/react";
import { GithubIcon } from "@icons/GithubIcon";
import { GoogleIcon } from "@icons/GoogleIcon";

export default function SignersFooter() {
  return (
    <footer className="flex flex-col lg:flex-col gap-6">
      <p className="text-sm text-center"> O continua con</p>
      <div className="flex flex-col lg:flex-row justify-center w-full items-center gap-3">
        <Button className="bg-[#fcfcfb] text-black font-bold w-full hover:scale-105 transition ease-in-out duration-200" endContent={<GoogleIcon />}>
          Google
        </Button>
        <Button className="bg-[#fcfcfb] text-black font-bold w-full hover:scale-105 transition ease-in-out duration-200" endContent={<GithubIcon />}>
          Github
        </Button>
      </div>
    </footer>
  )
}