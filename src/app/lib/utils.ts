export const fetchDataApi = async (route: string) => {
  const response = await fetch(`${process.env.API_URL}/${route}`);
  return response.json();
};
