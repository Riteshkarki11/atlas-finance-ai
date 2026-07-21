import axios from "axios";

import { CompanyComparison } from "../types/companyComparison";

const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

class CompanyComparisonService {

  async compareCompanies(
    symbols: string[]
  ): Promise<CompanyComparison[]> {

    const response =
      await axios.post<CompanyComparison[]>(
        `${API}/compare-companies`,
        {
          symbols,
        }
      );

    return response.data;

  }

}

export default new CompanyComparisonService();