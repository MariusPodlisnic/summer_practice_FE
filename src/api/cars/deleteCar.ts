import { apiFetch } from '../client';
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '../constants';
import { createApiError } from '../errors';

export const deleteCar = async (carId: string): Promise<void> => {
  const endpoint = API_ENDPOINTS.CAR_DETAILS.replace(
    ':carId',
    carId
  );

  const response = await apiFetch(endpoint, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw await createApiError(
      response,
      API_ERROR_MESSAGES.DELETE_CAR
    );
  }
};