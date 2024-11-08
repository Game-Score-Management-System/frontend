import { Modal, ModalContent, ModalHeader, ModalBody, Select, SelectItem, ModalFooter, Button } from "@nextui-org/react";
import useForm from "@hooks/useForm";
import { Role } from "../models/User.model";
import { updateUserFormSchema } from "../schemas/updateUserForm.schema";
import { useEffect } from "react";
import { useUpdateUserMutation } from "@/store/services/apiSlice";
import toast from "react-hot-toast";

interface UserModalActionsProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  initialData: { role: Role, userId: string };
}

export default function UserModalActions({ isOpen, onOpenChange, onClose, initialData }: UserModalActionsProps) {


  const [updateUser, { isLoading }] = useUpdateUserMutation();


  const handleUpdate = async () => {

    await updateUser({ id: initialData.userId, role: values.role }).unwrap()
      .then(() => {
        handleClose();
        toast.success('Usuario actualizado correctamente');
      }).catch(() => {
        console.log('Error al actualizar el usuario');
        toast.error('Error al actualizar el usuario');
      });

  }

  const handleClose = () => {
    onClose();

  }




  const { values, errors, handleChange, handleSubmit, setValues } = useForm({ role: initialData.role }, updateUserFormSchema, handleUpdate);

  useEffect(() => {
    setValues({ role: initialData.role });
    console.log(initialData);
  }, [initialData, setValues]);




  return (
    <>
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
                Actualizar Usuario
              </ModalHeader>
              <ModalBody>
                {

                  <Select
                    label="Cambiar Rol"
                    variant="bordered"
                    name="role"
                    value={values.role}
                    defaultSelectedKeys={[values.role]}
                    onChange={handleChange}
                    errorMessage={errors.role}
                    isInvalid={!!errors.role}
                  >
                    <>
                      <SelectItem key={Role.ADMIN}>
                        {Role.ADMIN}
                      </SelectItem>
                      <SelectItem key={Role.PLAYER}>
                        {Role.PLAYER}
                      </SelectItem>
                    </>
                  </Select>

                }

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={handleClose}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit" isLoading={isLoading}>
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