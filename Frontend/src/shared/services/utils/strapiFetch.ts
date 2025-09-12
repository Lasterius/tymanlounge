export const strapiFetch = async <T>(
  path: string,
  options?: RequestInit,
): Promise<T> => {
  // Принудительно используем локальный сервер для разработки
  const API_URL = process.env.STRAPI_URL
    ? `${process.env.STRAPI_URL}/api`
    : "http://localhost:1337/api";
  try {
    const response = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 3600 * 24 },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from Strapi: ${path}`, error);
    throw error;
  }
};
