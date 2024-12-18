'use client';
import { Key, useCallback, useEffect, useState } from "react";
import { User as UserNextUi, Chip, Tooltip, Switch, useDisclosure } from "@nextui-org/react";
import { PencilIcon } from "@heroicons/react/20/solid";
import { formatDate } from "@lib/utils";
import { useGetAllUsersQuery, useUpdateUserMutation } from "@store/services/apiSlice";
import { Role, User } from "@models/User.model";
import AdminTable from "@components/AdminTable";
import TablePaginator from "@components/TablePaginator";
import Search from "@components/Search";
import usePaginator from "@hooks/usePaginator";
import UserModalActions from "./UserModalActions";
import { useSearchParams } from "next/navigation";

const columns = [
  { name: "Nombre Jugador", uid: "name" },
  { name: "Rol", uid: "role" },
  { name: "Estado", uid: "status" },
  { name: 'Fecha Registro', uid: 'createdAt' },
  { name: "Acciones", uid: "actions" },
];

const statusColorMap: { [key: string]: "success" | "default" | "primary" | "secondary" | "warning" | "danger" } = {
  Activo: "success",
  Inactivo: "danger",
};

export default function UserList() {
  const searchParams = useSearchParams();
  const search = searchParams.get('query') ?? '';

  const { page, pages, onNextPage, onPreviousPage, setPage, setTotalPagesState } = usePaginator(0);
  const { data = { users: [], metadata: { totalPages: 0 } }, isLoading, refetch } = useGetAllUsersQuery({ limit: 5, page: page, search: search });

  const itemsToShowInTable = data.users;


  const [updateValuesUser, setUpdateValuesUser] = useState<{ role: Role, userId: string }>({ role: Role.PLAYER, userId: '' });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [updateUser] = useUpdateUserMutation();

  const handleOpen = useCallback((role: Role, userId: string) => {
    setUpdateValuesUser({ role, userId });
    onOpen();
  }, [onOpen]);

  useEffect(() => {
    if (!isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);



  useEffect(() => {
    setTotalPagesState(data?.metadata.totalPages);
  }, [data, setTotalPagesState]);


  const handleUserStatusChange = useCallback((userId: string, status: boolean) => {
    updateUser({ id: userId, status }).unwrap().then(() => refetch());
  }, [updateUser, refetch]);

  const renderCell = useCallback((user: User, columnKey: Key) => {
    const { name, lastname, email, role, status, id, createdAt } = user;

    const cellRenderers: { [key: string]: JSX.Element } = {
      name: (
        <UserNextUi
          avatarProps={{ radius: "lg", src: user.profilePicture }}
          description={email}
          name={`${name} ${lastname}`}
        >
          {email}
        </UserNextUi>
      ),
      role: (
        <div className="flex flex-col">
          <p className="text-bold text-sm capitalize">{role}</p>
        </div>
      ),
      status: (
        <Chip className="capitalize" color={statusColorMap[Boolean(status) ? "Activo" : "Inactivo"]} size="sm" variant="flat">
          {Boolean(status) ? "Activo" : "Inactivo"}
        </Chip>
      ),
      createdAt: (
        <div className="flex flex-col">
          <p className="text-xs capitalize">{formatDate(createdAt)}</p>
        </div>
      ),
      actions: (
        <div className="relative flex items-center gap-2 justify-center">
          <Tooltip content="Editar usuario">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleOpen(role, id)}>
              <PencilIcon width={20} height={20} />
            </span>
          </Tooltip>
          <Tooltip content={status ? "Desactivar usuario" : "Activar usuario"} color={status ? "danger" : "success"}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Switch defaultSelected={status} size="sm" aria-label="Automatic updates" color="primary" onChange={() => handleUserStatusChange(id, !status)} />
            </span>
          </Tooltip>
        </div>
      )
    };

    return cellRenderers[columnKey.toString()] || null;
  }, [handleUserStatusChange, handleOpen]);


  // const HeaderContent = useMemo(() => {
  //   return (
  //     <header className="flex justify-between w-full">
  //       <Search />
  //       <div className="flex justify-between items-center">
  //         <span className="text-default-400 text-small">Total {users.length} registros</span>
  //         <label className="flex items-center text-default-400 text-small ms-1">
  //           por página
  //           <select
  //             className="bg-transparent outline-none text-default-400 text-small"
  //             onChange={onRowsPerPageChange}
  //           >
  //             <option value="5">5</option>
  //             <option value="10">10</option>
  //             <option value="15">15</option>
  //           </select>
  //         </label>
  //       </div>
  //     </header>
  //   )
  // }, [onRowsPerPageChange, users.length]);

  // const onRowsPerPageChange = useCallback((e) => {
  //   setRowsPerPage(Number(e.target.value));
  //   // setPage(1);
  // }, []);


  return (
    <>
      <UserModalActions initialData={updateValuesUser} isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
      <AdminTable
        columns={columns}
        footer={<TablePaginator onNextPage={onNextPage} onPreviousPage={onPreviousPage} page={page} pages={pages} setPage={setPage} />}
        header={<Search placeholder="Buscar por nombre, apellido, usuario o correo" />}
        isLoading={isLoading}
        items={itemsToShowInTable}
        renderCell={renderCell}
      />
    </>
  );
}
