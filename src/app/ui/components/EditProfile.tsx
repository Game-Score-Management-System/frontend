'use client';
import { inputWrapperClasses } from "@/app/lib/utils";
import { CameraIcon, UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import { Button, Chip, Image, Input } from "@nextui-org/react";
import useForm from "@hooks/useForm";
import { UserEditable } from "@models/User.model";
import { EditableProfileForm } from "@schemas/editableProfileForm.schema";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { User } from "@models/User.model";
import supabase from "@/config/supabase";
import { MAX_IMAGE_PROFILE_SIZE, AVATARS_BUCKET_NAME } from "@/app/lib/constants";
import useAppSession from "@hooks/useSession";

export default function EditProfile() {

  const { session } = useAppSession();
  const user = session?.user as User;
  console.log({ user });


  const onSubmit = () => {
    console.log("Valido", validForm);
    console.log('Enviando datos', values);
  };

  const { values, validForm, errors, handleChange, handleSubmit } = useForm<UserEditable>({
    lastname: user.lastname,
    name: user.name,
    profilePicture: user.profilePicture,
    username: user.username
  }, EditableProfileForm, onSubmit);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<{ url: string, loading: boolean }>({
    url: user.profilePicture,
    loading: false
  });

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const size = file?.size ?? 0;

    if (!file) {
      toast.error('No se ha seleccionado ninguna imagen');
      return;
    };

    if (size > MAX_IMAGE_PROFILE_SIZE) {
      toast.error(`La imagen excede el tamaño máximo permitido de ${MAX_IMAGE_PROFILE_SIZE / (1024 * 1024)}MB`);
      return;
    }
    const filename = `avatar-${crypto.randomUUID()}`;

    setImageSrc({ ...imageSrc, loading: true });
    const { data, error } = await supabase.storage.from(AVATARS_BUCKET_NAME).upload(filename, file);
    if (error) {
      toast.error('Ha ocurrido un error al subir la imagen, intenta de nuevo');
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from(AVATARS_BUCKET_NAME).getPublicUrl(data?.path)
    setImageSrc({ url: publicUrl, loading: false });

    // Actualizar solo la imagen en la base de datos

    toast.success('Imagen actualizada correctamente!');
  };


  return (
    <section className="w-full relative">
      <div className="flex flex-col items-center bg-card-image bg-cover bg-center bg-no-repeat shadow-lg p-6 md:p-12 gap-6 pb-8 overflow-hidden rounded-lg ">
        <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full border-3 border-gray-700 overflow-hidden shadow-lg backdrop-blur-3xl group">
          <Image
            isBlurred
            src={imageSrc.url ?? ''}
            isLoading={imageSrc.loading}
            alt='User'
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-65 cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => imageInputRef.current?.click()}
          >
            <span className="text-white text-sm md:text-lg">
              <CameraIcon width={30} height={30} />
              <input type="file" className="hidden" accept="image/*" ref={imageInputRef} onChange={handleUploadImage} />
            </span>
          </div>
        </div>
        <Chip variant="dot" color="success" className="text-xl backdrop-blur-3xl">{user.username}</Chip>
        <form className="flex justify-start w-full  flex-col gap-5 backdrop-blur-3xl backdrop-brightness-110 py-7 px-10 rounded-xl" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4 w-full mb-6 md:mb-0">
            <Input
              type="text"
              name="name"
              label="Tu nombre"
              placeholder="John"
              labelPlacement="outside"
              classNames={{ inputWrapper: inputWrapperClasses }}
              startContent={<UserCircleIcon className="size-6 text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
              value={values.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              errorMessage={errors.name}
            />
            <Input
              type="text"
              name="lastname"
              label="Tu apellido"
              placeholder="Doe"
              labelPlacement="outside"
              classNames={{ inputWrapper: inputWrapperClasses }}
              startContent={<UserCircleIcon className="size-6 text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
              value={values.lastname}
              onChange={handleChange}
              isInvalid={!!errors.lastname}
              errorMessage={errors.lastname}
            />
          </div>
          <Input
            type="text"
            name="username"
            label="Tu nombre de usuario"
            placeholder="@JohnDoe"
            labelPlacement="outside"
            classNames={{ inputWrapper: inputWrapperClasses }}
            startContent={<UserIcon className="size-6 text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            value={values.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
            errorMessage={errors.username}
          />

          <Button
            type="submit"
            className={`bg-gradient-to-t from-[#1b56f0] to-[#457aff] text-white font-bold rounded-xl md:p-4 md:py-7 p-3 w-full text-sm md:text-lg hover:scale-105 transition duration-200 ease-in-out uppercase`}
          >
            Guardar Cambios
          </Button>
        </form>
      </div>


    </section>
  )
}