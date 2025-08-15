const BackendUrl = import.meta.env.VITE_BACKEND_URL;
const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

export const BASE_URL = `${BackendUrl}/api`;

export const registerUser = async (payload) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
};
