import { signIn, signOut } from 'next-auth/react';

export async function iniciarSesion(
  provider: 'credential' | 'google' | 'github',
  values?: { email: string; password: string }
) {
  if (provider === 'credential') {
    if (!values) {
      throw new Error('Por favor, ingresa tus credenciales');
    }

    const res = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirectTo: '/dashboard',
      redirect: false
    });

    if (res?.error) {
      console.log('error', res.error);
      throw new Error('Por favor, verifica tus credenciales');
    }
  } else if (provider === 'github') {
    await signIn('github', { callbackUrl: '/dashboard' });
  } else if (provider === 'google') {
    await signIn('google', { callbackUrl: '/dashboard' });
  }
}

export async function cerrarSesion() {
  await signOut({
    redirectTo: '/login'
  });
}
