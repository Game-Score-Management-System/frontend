'use server';

import { ApiResponse } from '@/app/ui/models/ApiResponse.model';

export const getDataApi = async <T>(route: string, authToken: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/${route}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    const parsedResponse: ApiResponse<T> = await response.json();

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
