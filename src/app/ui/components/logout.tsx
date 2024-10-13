'use client';

import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownTrigger, User, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const logout = () => {
    console.log('cerrando sesión');
    router.push('/login');
  }


  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: "https://robohash.org/random2",
          }}
          className="transition-transform"
          description={
            <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
              @tonyreichert
            </p>
          }
          name="Juan Carlos Romero"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="shadow">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">
            Estas logueado como
          </p>
          <p className="font-bold">@tonyreichert</p>
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          <div className="flex items-center gap-2" onClick={() => logout()}>
            <ArrowLeftEndOnRectangleIcon className="size-5" />
            Cerar Sesion
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}