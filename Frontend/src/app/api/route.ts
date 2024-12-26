export const strapiFetch = async <T>(path: string): Promise<T> => {
  const API_URL = process.env.API_URL;
  try {
    const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
