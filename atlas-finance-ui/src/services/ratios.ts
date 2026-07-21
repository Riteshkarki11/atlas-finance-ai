import axios from "axios";

import {
  FinancialRatios,
} from "../types/ratio";

const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

class RatioService {

  async getRatios(
    symbol: string
  ): Promise<FinancialRatios> {

    const response =
      await axios.get<FinancialRatios>(
        `${API}/financial-ratios/${symbol}`
      );

    return response.data;
  }

}

export default new RatioService();