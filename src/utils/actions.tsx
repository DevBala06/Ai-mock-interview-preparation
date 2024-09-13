import axios from "axios"

export const fecthFeedback = async (userId: string) => {
    try {
        const response = await axios.get(`/api/generate-interview/${userId}`);
        const data = response.data;
        return data.interviews;
    } catch (error) {
        console.log(error);
    }
}