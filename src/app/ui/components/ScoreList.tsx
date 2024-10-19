'use client';
import { Key, useCallback } from "react";
import { Tooltip, User } from "@nextui-org/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Score } from "@models/Score.model";
import { formatDate } from "@lib/utils";
import { useDeleteScoreMutation, useGetScoresQuery } from "@store/services/apiSlice";
import AdminTable from "@components/AdminTable";
import Search from "@components/Search";
import TablePaginator from "@components/TablePaginator";
import usePaginator from "@hooks/usePaginator";

const columns = [
  { name: "Nombre Jugador", uid: "name" },
  { name: "Juego", uid: "game" },
  { name: "Puntuación", uid: "score" },
  { name: "Fecha de Creación", uid: "createdAt" },
  { name: 'Acciones', uid: 'actions' }
];


export default function ScoreList() {
  const { data: scores = [], refetch, isLoading } = useGetScoresQuery();
  const { page, pages, itemsToShowInTable, onNextPage, onPreviousPage, setPage } = usePaginator<Score>(scores, 5);


  const [deleteScore] = useDeleteScoreMutation();

  const handleDelete = useCallback((scoreId: Score['id']) => {
    deleteScore(scoreId)
    console.log(scores);
    refetch();
  }, [deleteScore, refetch, scores]);

  const renderCell = useCallback((score: Score, columnKey: Key) => {
    const { game, score: scoreUser, user, createdAt } = score;

    const cellContent: Record<string, JSX.Element> = {
      name: (
        <User
          avatarProps={{ radius: "lg", src: user.profilePicture }}
          description={user.email}
          name={user.name}
        >
          {user.email}
        </User>
      ),
      game: (
        <div className="flex flex-col">
          <p className="text-xs capitalize">{game}</p>
        </div>
      ),
      score: (
        <div className="flex flex-col">
          <p className="text-xs capitalize">{scoreUser}</p>
        </div>
      ),
      createdAt: (
        <div className="flex flex-col">
          <p className="text-xs capitalize">{formatDate(createdAt)}</p>
        </div>
      ),
      actions: (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Edit user">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <PencilIcon width={20} height={20} />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDelete(score.id)}>
              <TrashIcon width={20} height={20} />
            </span>
          </Tooltip>
        </div>
      )
    };

    return cellContent[columnKey.toString()] || null;
  }, [handleDelete]);

  return (
    <AdminTable
      columns={columns}
      footer={<TablePaginator onNextPage={onNextPage} onPreviousPage={onPreviousPage} page={page} pages={pages} setPage={setPage} />}
      header={<Search />}
      isLoading={isLoading}
      items={itemsToShowInTable}
      renderCell={renderCell}
    />
  );
}
