import frcAPI from './frcApiClient';

export async function uploadBase64Image({ dataBase64, contentType = 'image/jpeg', filename = 'image' }) {
  try {
    const res = await frcAPI.post('/uploads/image', { dataBase64, contentType, filename });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.url || null;
  } catch {
    return null;
  }
}
