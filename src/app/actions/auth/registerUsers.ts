import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.0.107:3000";

const registerUsers = async (payload: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user`, payload);
    return response.data;

  } catch (error) {
    console.error("Error registering user:", error);
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Unknown error occurred");
  }
};

export default registerUsers;
