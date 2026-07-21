import axios from "axios";

import {
  CompanyOverview,
} from "../types/companyOverview";

const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

class CompanyOverviewService {

  async getCompanyOverview(
    symbol: string
  ): Promise<CompanyOverview> {

    const response =
      await axios.get<CompanyOverview>(
        `${API}/company-overview/${symbol}`
      );

    return response.data;
  }

}

export default new CompanyOverviewService();