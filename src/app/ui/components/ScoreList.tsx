'use client';
import { Key, useCallback, useEffect, useState } from "react";
import { Button, Chip, Tooltip, User, useDisclosure, } from "@nextui-org/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Score } from "@models/Score.model";
import { formatDate } from "@lib/utils";
import { useDeleteScoreMutation, useGetScoresQuery } from "@store/services/apiSlice";
import AdminTable from "@components/AdminTable";
import Search from "@components/Search";
import TablePaginator from "@components/TablePaginator";
import usePaginator from "@hooks/usePaginator";
import { PlusIcon } from "@heroicons/react/24/outline";
import ScoreModalActions from "./ScoreModalActions";

const columns = [
  { name: "Nombre Jugador", uid: "name" },
  { name: "Juego", uid: "game" },
  { name: "Puntuación", uid: "score" },
  { name: "Fecha de Creación", uid: "createdAt" },
  { name: "Estado", uid: "status" },
  { name: 'Acciones', uid: 'actions' }
];


export default function ScoreList() {
  const { data: scores = [], refetch, isLoading } = useGetScoresQuery({ limit: 20, page: 1, orderBy: 'createdAt' });
  const { page, pages, itemsToShowInTable, onNextPage, onPreviousPage, setPage } = usePaginator<Score>(scores, 5);
  const [deleteScore] = useDeleteScoreMutation();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [updateValuesScore, setUpdateValuesScore] = useState<{ score: number; game: string; scoreId?: string; userId?: string }>({ score: 0, game: '', scoreId: '', userId: '' });

  useEffect(() => {
    if (!isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);


  const handleDelete = useCallback((scoreId: Score['id']) => {
    deleteScore(scoreId)
    refetch();
  }, [deleteScore, refetch]);


  const handleCreateAndUpdate = useCallback((type: 'create' | 'update', score?: Score) => {

    if (type === 'update' && score) {
      setUpdateValuesScore({
        score: score?.score,
        game: score?.game,
        scoreId: score?.id
      });
    }

    if (type === 'create') {
      setUpdateValuesScore({
        score: 0,
        game: '',
        userId: ''
      });
    }

    onOpen();
  }, [onOpen]);

  const renderCell = useCallback((score: Score, columnKey: Key) => {
    const { game, score: scoreUser, user, createdAt, deletedAt } = score;

    const cellContent: Record<string, JSX.Element> = {
      name: (
        <User
          avatarProps={{ radius: "lg", src: user.profilePicture }}
          description={user.email}
          name={`${user.name} ${user.lastname}`}
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
      status: (
        <div className="flex flex-col">
          {
            deletedAt == null ?
              <Chip color="success" variant="flat">Activo</Chip> :
              <Tooltip color="foreground" className="capitalize" content={formatDate(deletedAt)} placement='bottom'>
                <Chip color="danger" variant="flat">Eliminado</Chip>
              </Tooltip>
          }
        </div>
      ),

      actions: (
        <div className="relative flex items-center gap-2">
          {
            deletedAt == null && (
              <>
                <Tooltip content="Editar puntuación" color="default">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => handleCreateAndUpdate('update', score)}>
                    <PencilIcon width={20} height={20} />
                  </span>
                </Tooltip>

                <Tooltip color="danger" content="Eliminar puntuación">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDelete(score.id)}>
                    <TrashIcon width={20} height={20} />
                  </span>
                </Tooltip>
              </>
            )
          }
        </div>
      )
    };

    return cellContent[columnKey.toString()] || null;
  }, [handleDelete, handleCreateAndUpdate]);

  return (
    <>
      <ScoreModalActions isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} initialData={updateValuesScore} />
      <AdminTable
        columns={columns}
        footer={<TablePaginator onNextPage={onNextPage} onPreviousPage={onPreviousPage} page={page} pages={pages} setPage={setPage} />}
        header={
          <div className="flex justify-between">
            <Search />
            <Button color="default" onClick={() => handleCreateAndUpdate('create')}>
              Nuevo Score
              <PlusIcon width={20} height={20} />
            </Button>
          </div>
        }
        isLoading={isLoading}
        items={itemsToShowInTable}
        renderCell={renderCell}
      />
    </>
  );
}

