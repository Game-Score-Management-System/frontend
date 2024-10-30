// 'use server';
// import { signIn, signOut } from '@auth';

import { signIn, signOut } from 'next-auth/react';
export async function iniciarSesion(
  provider: 'credential' | 'google' | 'github',
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
