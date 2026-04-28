const API_BASE = import.meta.env.VITE_API_URL; // adjust port if needed

export const fetchProperties = async () => {
  const res = await fetch(`${API_BASE}/properties`);
  if (!res.ok) throw new Error('Failed to fetch properties');
  return res.json();
};

export const fetchPropertyById = async (id) => {
  const res = await fetch(`${API_BASE}/properties/${id}`);
  if (!res.ok) throw new Error('Failed to fetch property');
  return res.json();
};

