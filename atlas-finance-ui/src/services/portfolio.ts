import axios from "axios";

import { Portfolio } from "../types/portfolio";

const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

class PortfolioService {

  async getPortfolio(): Promise<Portfolio> {

    const response =
      await axios.get<Portfolio>(
        `${API}/portfolio`
      );

    return response.data;

  }

}

export default new PortfolioService();