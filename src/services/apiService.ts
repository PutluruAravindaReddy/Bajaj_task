import { BASE_URL, API_ROUTES } from "../constants/apiRoutes";

/**
 * Registers a user using the API.
 */
export const createUser = async (rollNumber: string, name: string) => {
  const response = await fetch(`${BASE_URL}${API_ROUTES.CREATE_USER}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rollNumber, name }),
  });

  if (!response.ok) {
    throw new Error('Failed to register user');
  }

  return response.json();
};

/**
 * Fetches the dynamic form structure for a user.
 */
export const getForm = async (rollNumber: string) => {
  const response = await fetch(`${BASE_URL}${API_ROUTES.GET_FORM}?rollNumber=${rollNumber}`);

  if (!response.ok) {
    throw new Error('Failed to fetch form');
  }

  return response.json();
};
