'use client';

import { cerrarSesion } from "@/app/lib/actions";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownTrigger, User, DropdownMenu, DropdownItem } from "@nextui-org/react";
import useAppSession from "@hooks/useSession";


export default function Logout() {
  const { session } = useAppSession();

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: session?.user?.profilePicture ?? "https://robohash.org/random2",
          }}
          className="transition-transform"
          description={
            <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
              {/* @tonyreichert */}
              {session?.user?.username}
            </p>
          }
          name={`${session?.user?.name} ${session?.user?.lastname}`}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="shadow">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-bold">
            Estas logueado como
          </p>
          <p className="font-bold">
            {session?.user?.username}
          </p>
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          <div className="flex items-center gap-2" onClick={() => cerrarSesion()}>
            <ArrowLeftEndOnRectangleIcon className="size-5" />
            Cerar Sesion
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}