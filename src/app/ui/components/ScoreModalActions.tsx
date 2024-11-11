import { createScoreFormSchema } from "@schemas/createScoreForm.schema";
import { Modal, ModalContent, ModalHeader, ModalBody, Avatar, Input, ModalFooter, Button, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useGetAllUsersQuery, useCreateNewScoreMutation, useUpdateScoreMutation } from "@/store/services/apiSlice";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useForm from "@hooks/useForm";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import usePaginator from "../hooks/usePaginator";
import { User } from "../models/User.model";

interface ScoreModalActionsProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  initialData: { userId?: string; score: number; game: string; scoreId?: string };
}

export default function ScoreModalActions({ isOpen, onOpenChange, onClose, initialData }: ScoreModalActionsProps) {
  const [isOpenSeletable, setIsOpenSelectable] = useState(false);
  const { page, onNextPage, setTotalPagesState } = usePaginator(0);
  const { data = { users: [], metadata: { totalPages: 0 } }, isLoading: isLoading } = useGetAllUsersQuery({ limit: 10, page: page });
  const users = data.users;

  const [infiniteUsers, setInfiniteUsers] = useState<User[]>([]);


  const [createNewScore] = useCreateNewScoreMutation();
  const [updateScore, { isLoading: isLoadingUpdate }] = useUpdateScoreMutation();
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (data?.metadata.totalPages !== undefined) {
      setTotalPagesState(data.metadata.totalPages);
    }
  }, [data.metadata.totalPages, setTotalPagesState]);


  useEffect(() => {
    setInfiniteUsers((prev) => [...prev, ...users]);
  }, [users]);

  const [, scrollerRef] = useInfiniteScroll({
    hasMore: data.metadata.totalPages > page,
    isEnabled: isOpenSeletable,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore: () => {
      onNextPage();
    }
  });


  const handleCreate = async () => {

    if (isUpdate) {
      await updateScore({ id: initialData.scoreId, game: values.game, score: +values.score }).unwrap()
        .then(() => {
          handleClose();
          toast.success('Puntuación actualizada correctamente');
        }).catch(() => {
          toast.error('Error al actualizar la puntuación');
        });

      return;
    }

    console.log('values', values);

    const newScore = {
      userId: values.userId,
      score: +values.score,
      game: values.game
    }

    await createNewScore(newScore).unwrap().then(() => {
      handleClose();
      toast.success('Puntuación creada correctamente');
    }).catch(() => {
      toast.error('Error al crear la puntuación');
    });
  }

  const handleClose = () => {
    onClose();
  }


  interface CreateScore {
    userId: string;
    score: number;
    game: string;
  }

  const { values, errors, handleChange, handleSubmit, setValues } = useForm<CreateScore>({ userId: '', score: 0, game: '' }, createScoreFormSchema, handleCreate);

  useEffect(() => {

    if (initialData?.scoreId) {
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }

    setValues({
      game: initialData?.game ?? '',
      score: initialData?.score ?? 0,
      userId: initialData?.userId ?? ''
    });
  }, [initialData, setValues, setIsUpdate]);



  if (!users) return null;

  return (
    <>
      {/* <Button onPress={onOpen} color="primary">Open Modal</Button> */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(handleClose) => (
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1">
                {isUpdate ? 'Actualizar puntuación' : 'Crear nueva puntuación'}
              </ModalHeader>
              <ModalBody>
                {
                  !isUpdate && (
                    <Autocomplete
                      label="Selecciona un usuario"
                      variant="bordered"
                      name="userId"
                      value={values.userId}
                      onChange={handleChange}
                      errorMessage={errors.userId}
                      isInvalid={!!errors.userId}
                      isLoading={isLoading}
                      scrollRef={scrollerRef}
                      onOpenChange={setIsOpenSelectable}
                      onSelectionChange={(key) => setValues((prev) => ({ ...prev, userId: key as string }))}
                    >
                      <>
                        {
                          infiniteUsers?.map(user => (
                            <AutocompleteItem
                              key={user.id}
                              startContent={<Avatar alt={user.username} className="w-6 h-6" src={user.profilePicture} />}
                            >
                              {user.username}
                            </AutocompleteItem>
                          ))
                        }
                      </>
                    </Autocomplete>
                  )
                }

                <Input
                  name="score"
                  label="Puntuación"
                  placeholder="Ej: 100"
                  type="number"
                  variant="bordered"
                  value={values.score.toString()}
                  onChange={handleChange}
                  errorMessage={errors.score}
                  isInvalid={!!errors.score}
                />
                <Input
                  label="Juego"
                  placeholder="Ej: Pacman"
                  type="text"
                  variant="bordered"
                  value={values.game}
                  onChange={handleChange}
                  errorMessage={errors.game}
                  isInvalid={!!errors.game}
                  name="game"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={handleClose}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit" isLoading={isLoading || isLoadingUpdate}>
                  Guardar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}