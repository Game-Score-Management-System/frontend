'use client';
import { useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Input, Spinner } from "@nextui-org/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Score } from "@/app/ui/models/Score.model";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/app/lib/utils";
import { useDeleteScoreMutation, useGetScoresQuery } from "@/store/services/apiSlice";

const columns = [
  { name: "Nombre Jugador", uid: "name" },
  { name: 'Nombre de Usuario', uid: 'username' },
  { name: "Juego", uid: "game" },
  { name: "Puntuación", uid: "score" },
  { name: "Fecha de Creación", uid: "createdAt" },
  { name: 'Acciones', uid: 'actions' }
];


export default function ScoreList() {
  const { data: scores = [], refetch, isLoading } = useGetScoresQuery();

  const [deleteScore] = useDeleteScoreMutation();

  const handleDelete = (scoreId: Score['scoreId']) => {
    const deleted = deleteScore(scoreId)
    console.log(scores);
    refetch();
  };

  const renderCell = useCallback((score: Score, columnKey: string) => {
    const { game, score: scoreUser, user, createdAt } = score;
    if (columnKey === "name") {
      return (
        <div className="flex flex-col">
          <p className="text-xs capitalize">{user.name}</p>
        </div>
      );
    } else if (columnKey === "username") {
      return (
        <div className="flex flex-col">
          <p className="text-xs capitalize">{user.username}</p>
        </div>
      );
    } else if (columnKey === "game") {
      return (
        <div className="flex flex-col">
          <p className="text-xs capitalize">{game}</p>
        </div>
      );
    } else if (columnKey === "score") {
      return (
        <div className="flex flex-col">
          <p className="text-xs capitalize">{scoreUser}</p>
        </div>
      );
    } else if (columnKey === "createdAt") {
      return (
        <div className="flex flex-col">
          <p className="text-xs capitalize">{formatDate(createdAt)}</p>
        </div>
      );
    } else if (columnKey === "actions") {
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <PencilIcon width={20} height={20} />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDelete(score.scoreId)}>
              <TrashIcon width={20} height={20} />
            </span>
          </Tooltip>
        </div>
      );
    }

  }, [handleDelete]);

  return (
    <>
      <header className="flex justify-end w-full">

        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<MagnifyingGlassIcon width={25} />}
        // value={ }
        // onClear={ }
        // onValueChange={ }
        />
      </header>
      <Table
        aria-label="Example table with custom cells"
        classNames={{ wrapper: "bg-transparent/40" }}

      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={scores} isLoading={isLoading} loadingContent={<Spinner label="Cargando..." />}>
          {(item) => (
            <TableRow key={item.scoreId}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey.toString())}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table >
    </>
  );
}
