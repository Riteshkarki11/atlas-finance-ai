import api from "./api";
import axios from "axios";

export async function getInvestmentReport(symbol: string) {
  try {
    const response = await api.get(`/investment-report/${symbol}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Message:", error.message);
      console.log("Code:", error.code);
      console.log("Response:", error.response);
      console.log("Request:", error.request);
      console.log("Config:", error.config);
    } else {
      console.error(error);
    }

    throw error;
  }
}