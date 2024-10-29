import { useSession } from 'next-auth/react';

export default function useAppSession() {
  const { data: session, status, update } = useSession();

  return {
    session,
    status,
    update
  };
}
