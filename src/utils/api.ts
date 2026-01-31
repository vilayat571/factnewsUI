const API_URL = "http://localhost:3000/api/v1/news";


// Add this new function
export const searchNews = async (title: string) => {
  const response = await fetch(`${API_URL}?title=${encodeURIComponent(title)}`);
  if (!response.ok) throw new Error("Failed to search news");
  return response.json();
};

export const fetchNewsById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Failed to fetch news");
  return response.json();
};

export const deleteNews = async (id: string) => {
  const response = await fetch(`${API_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete news");
  return response.json();
};