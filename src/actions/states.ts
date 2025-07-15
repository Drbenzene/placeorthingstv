import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL;

interface ContestantDto {
  firstName: string;
  lastName: string;
  email: string;
  state: string;
}
//

const getStates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}states`);
    console.log("States fetched successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching states:", error);
    return;
    // throw error;
  }
};

const getVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}videos`);
    console.log("States fetched successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching states:", error);
    // throw error;
  }
};

const getStations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}stations`);
    console.log("Stations fetched successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching stations:", error);
    // throw error;
  }
};

const addContestant = async (contestantData: ContestantDto) => {
  try {
    const response = await axios.post(`${BASE_URL}contenstants`, {
      data: contestantData,
    });
    console.log("Contestant added successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error adding contestant:", error);
    // throw error;
  }
};

export { getVideos, getStates, getStations, addContestant };
