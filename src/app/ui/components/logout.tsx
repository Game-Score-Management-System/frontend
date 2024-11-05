'use client';

import { cerrarSesion } from "@/app/lib/actions/actions";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { Dropdown, DropdownTrigger, User, DropdownMenu, DropdownItem } from "@nextui-org/react";
import useAppSession from "@hooks/useSession";
import { useAppDispatch } from "../hooks/useStore";
import { logout } from "@/store/slices/userSlice";


export default function Logout() {
  const { session, status } = useAppSession();
  const dispatch = useAppDispatch();

  if (status === 'loading') return null;

  const handleLogout = async () => {
    dispatch(logout());

    console.log('session?.user.token', session?.user.token);
    await cerrarSesion(session?.user.token ?? '');
  }

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: session?.user?.profilePicture,
          }}
          className="transition-transform"
          description={
            <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
              {/* @tonyreichert */}
              {session?.user?.username}
            </p>
          }
          name={
            <p className="overflow-hidden text-ellipsis w-40 whitespace-nowrap text-start">
              {session?.user?.name} {session?.user?.lastname}
            </p>
          }
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
          <div className="flex items-center gap-2" onClick={() => handleLogout()}>
            <ArrowLeftEndOnRectangleIcon className="size-5" />
            Cerar Sesion
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}