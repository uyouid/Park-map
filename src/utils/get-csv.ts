import axios from "axios";

const url = import.meta.env.VITE_CSV_URL;
const timeout = parseInt(import.meta.env.VITE_HTTP_REQUEST_TIMEOUT);

export const getCsv = async (): Promise<string | null> => {
  try {
    const result = await axios.get(url, { timeout: timeout });
    return result.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
