import { Button } from "@nextui-org/react";
import { GithubIcon } from "@icons/GithubIcon";
import { GoogleIcon } from "@icons/GoogleIcon";
// import { iniciarSesion } from "@/app/lib/actions/actions"

export default function SignersFooter() {
  return (
    <footer className="flex flex-col lg:flex-col gap-6">
      <p className="text-sm text-center"> O continua con</p>
      <div className="flex flex-col lg:flex-row justify-center w-full items-center gap-3">
        <Button
          className="bg-[#fcfcfb] text-black font-bold w-full hover:scale-105 transition ease-in-out duration-200"
          endContent={<GoogleIcon />}
          disabled
        >
          Google
        </Button>
        <Button
          className="bg-[#fcfcfb] text-black font-bold w-full hover:scale-105 transition ease-in-out duration-200"
          endContent={<GithubIcon />}
          // onClick={() => iniciarSesion("github")}
          disabled
        >
          Github
        </Button>
      </div>
    </footer>
  )
}