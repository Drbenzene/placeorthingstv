import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

interface ContestantDto {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
}

interface CachedData<T> {
  data: T;
  timestamp: number;
  expiryTime: number;
}

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Generic function to handle caching logic
const getCachedData = <T>(key: string): CachedData<T> | null => {
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const parsedData: CachedData<T> = JSON.parse(cached);
      return parsedData;
    }
  } catch (error) {
    console.error(`Error reading cached data for ${key}:`, error);
    localStorage.removeItem(key); // Remove corrupted cache
  }
  return null;
};

const setCachedData = <T>(key: string, data: T): void => {
  try {
    const cacheData: CachedData<T> = {
      data,
      timestamp: Date.now(),
      expiryTime: Date.now() + CACHE_DURATION,
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error(`Error caching data for ${key}:`, error);
  }
};

const isCacheValid = <T>(cachedData: CachedData<T>): boolean => {
  return Date.now() < cachedData.expiryTime;
};

// Generic fetch with cache function
const fetchWithCache = async <T>(
  key: string,
  fetchFunction: () => Promise<T>,
  forceRefresh = false
): Promise<T | null> => {
  const cachedData = getCachedData<T>(key);

  // Return cached data immediately if valid and not forcing refresh
  if (cachedData && isCacheValid(cachedData) && !forceRefresh) {
    console.log(`Returning cached data for ${key}`);

    // Background update - fetch fresh data without waiting
    fetchFunction()
      .then((freshData) => {
        setCachedData(key, freshData);
        console.log(`Background update completed for ${key}`);
      })
      .catch((error) => {
        console.error(`Background update failed for ${key}:`, error);
      });

    return cachedData.data;
  }

  // If no valid cache or forcing refresh, fetch fresh data
  try {
    console.log(`Fetching fresh data for ${key}`);
    const freshData = await fetchFunction();
    setCachedData(key, freshData);
    return freshData;
  } catch (error) {
    console.error(`Error fetching fresh data for ${key}:`, error);

    // Return stale cache if available as fallback
    if (cachedData) {
      console.log(`Returning stale cached data for ${key} as fallback`);
      return cachedData.data;
    }

    return null;
  }
};

const getStates = async () => {
  return fetchWithCache("weekend-kpaje-states", async () => {
    const response = await axios.get(`${BASE_URL}states`);
    console.log("States fetched successfully:", response);
    return response.data;
  });
};

const getVideos = async () => {
  return fetchWithCache("weekend-kpaje-videos", async () => {
    const response = await axios.get(`${BASE_URL}videos`);
    console.log("Videos fetched successfully:", response);
    return response.data;
  });
};

const getStations = async () => {
  return fetchWithCache("weekend-kpaje-stations", async () => {
    const response = await axios.get(`${BASE_URL}stations`);
    console.log("Stations fetched successfully:", response);
    return response.data;
  });
};

const addContestant = async (contestantData: ContestantDto) => {
  try {
    const response = await axios.post(`${BASE_URL}contestants`, {
      data: contestantData,
    });
    console.log("Contestant added successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error adding contestant:", error);
    throw error; // Re-throw for form handling
  }
};

// Utility functions for manual cache management
const clearCache = (key?: string) => {
  if (key) {
    localStorage.removeItem(key);
    console.log(`Cache cleared for ${key}`);
  } else {
    // Clear all weekend-kpaje related cache
    const keys = [
      "weekend-kpaje-states",
      "weekend-kpaje-videos",
      "weekend-kpaje-stations",
    ];
    keys.forEach((k) => localStorage.removeItem(k));
    console.log("All cache cleared");
  }
};

const refreshCache = async (key: string) => {
  switch (key) {
    case "weekend-kpaje-states":
      return getStates();
    case "weekend-kpaje-videos":
      return getVideos();
    case "weekend-kpaje-stations":
      return getStations();
    default:
      console.error(`Unknown cache key: ${key}`);
  }
};

export {
  getVideos,
  getStates,
  getStations,
  addContestant,
  clearCache,
  refreshCache,
};
