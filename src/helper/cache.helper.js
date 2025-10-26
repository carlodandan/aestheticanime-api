import dotenv from "dotenv";

dotenv.config();

const CACHE_SERVER_URL = process.env.CACHE_URL || null;

export const getCachedData = async (key) => {
  try {
    if (!CACHE_SERVER_URL) {
      console.log(CACHE_SERVER_URL);
      return;
    }
    const response = await fetch(`${CACHE_SERVER_URL}/${key}`);
    if (response.status === 404) {
      return null;
    }
    return await response.json();
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

export const setCachedData = async (key, value) => {
  try {
    if (!CACHE_SERVER_URL) {
      return;
    }
    await fetch(CACHE_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, value }),
    });
  } catch (error) {
    console.error("Error setting cache data:", error);
    throw error;
  }
};