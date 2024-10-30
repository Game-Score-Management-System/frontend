'use server';

export const postDataApi = async (route: string, data: Record<string, unknown>) => {
  try {
    console.log(process.env.API_URL);
    const response = await fetch(`${process.env.API_URL}/${route}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const parsedResponse = await response.json();

    console.error('🔴🔴🔴ERROR🔴🔴🔴🔴', parsedResponse);
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
