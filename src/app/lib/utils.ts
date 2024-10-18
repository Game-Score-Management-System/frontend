export const fetchDataApi = async (route: string) => {
  const response = await fetch(`${process.env.API_URL}/${route}`);
  return response.json();
};

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
