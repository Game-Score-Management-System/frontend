export const fetchDataApi = async (route: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${route}`);
    if (!response.ok) {
      throw new Error('Error al obtener los datos');
    }
    return response.json();
  } catch (error: unknown) {
    console.error(error);
    return [];
  }
};

export const postDataApi = async (route: string, data: Record<string, unknown>) => {
  try {
    const response = await fetch(`${process.env.API_URL}/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const parsedResponse = await response.json();

    if (!parsedResponse.success) {
      throw new Error(parsedResponse.message);
    }

    return parsedResponse;
  } catch (error: unknown) {
    console.error('🔴🔴🔴🔴🔴🔴🔴', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const inputWrapperClasses = [
  'shadow-xl',
  'bg-default-200/50',
  'dark:bg-default/60',
  'backdrop-blur-xl',
  'backdrop-saturate-200',
  'hover:bg-default-200/70',
  'dark:hover:bg-default/70',
  'group-data-[focus=true]:bg-default-200/50',
  'dark:group-data-[focus=true]:bg-default/60'
];
