"use client";

import { CompanyComparison } from "../../types/companyComparison";
import ComparisonRow from "./ComparisonRow";

interface MetricDefinition {
  label: string;
  key: keyof CompanyComparison;
  suffix?: string;
  precision?: number;
  positiveGood?: boolean;
}

interface Props {
  title: string;
  companies: CompanyComparison[];
  metrics: MetricDefinition[];
}

export default function ComparisonSection({
  title,
  companies,
  metrics,
}: Props) {

  return (
    <tbody>

      <tr className="bg-slate-950">

        <td
          colSpan={companies.length + 1}
          className="px-5 py-4 text-lg font-bold text-blue-400"
        >
          {title}
        </td>

      </tr>

      {metrics.map((metric) => (

        <ComparisonRow
          key={metric.label}
          label={metric.label}
          values={companies.map(
            company => company[metric.key] as number | string
          )}
          suffix={metric.suffix}
          precision={metric.precision}
          positiveGood={metric.positiveGood}
        />

      ))}

    </tbody>
  );

}