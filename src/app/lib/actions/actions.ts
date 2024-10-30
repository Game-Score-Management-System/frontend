// import { signIn, signOut } from '@auth';

import { signIn, signOut } from 'next-auth/react';
import { postDataApi } from '@lib/actions/http';
import { Providers } from '@models/Providers.model';

export async function iniciarSesion(
  provider: Providers,
  values?: { email: string; password: string }
) {
  if (provider === 'credential') {
    if (!values) {
      throw new Error('Por favor, ingresa tus credenciales');
    }

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      });

      if (result?.error) {
        console.log('result.error', result);
        throw new Error(result.error);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('error', error);
      throw new Error('Por favor, verifica tus credenciales');
    }
  } else if (provider === 'github') {
    await signIn('github', { callbackUrl: '/dashboard/leaderboard' });
  } else if (provider === 'google') {
    await signIn('google', { callbackUrl: '/dashboard/leaderboard' });
  }
}

export async function cerrarSesion() {
  await signOut({
    redirectTo: '/login'
  });
}

export async function registrar(provider: Providers, values: Record<string, unknown>) {
  if (provider === 'credential') {
    console.log('values', values);
    try {
      const response = await postDataApi('auth/register', values);
      console.log('response', response);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  } else if (provider === 'github') {
    await signIn('github', { callbackUrl: '/dashboard/leaderboard' });
  }
}
