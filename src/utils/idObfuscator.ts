// Fungsi untuk mengubah ID menjadi string Base64
export const encodeId = (id: string | number): string => {
  try {
    return btoa(String(id));
  } catch (error) {
    console.error("Failed to encode ID:", error);
    return String(id);
  }
};

// Fungsi untuk mengubah string Base64 kembali menjadi ID
export const decodeId = (encodedId: string): string => {
  try {
    return atob(encodedId);
  } catch (error) {
    console.error("Failed to decode ID:", error);
    return encodedId;
  }
};
