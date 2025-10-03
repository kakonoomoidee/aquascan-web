// file: src/utils/idObfuscator.ts
export const encodeId = (id: string | number): string => {
  try {
    return btoa(String(id));
  } catch (error) {
    console.error("Failed to encode ID:", error);
    return String(id);
  }
};

export const decodeId = (encodedId: string): string => {
  try {
    return atob(encodedId);
  } catch (error) {
    console.error("Failed to decode ID:", error);
    return encodedId;
  }
};
