import axios from "axios";

import { FinancialStatementsResponse } from "../types/financialStatement";

const API =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8000";

class FinancialStatementsService {

  async getStatements(
    symbol: string
  ): Promise<FinancialStatementsResponse> {

    const response = await axios.get<FinancialStatementsResponse>(
      `${API}/financial-statements/${symbol}`
    );

    return response.data;
  }

}

export default new FinancialStatementsService();