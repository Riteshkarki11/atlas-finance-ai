"use client";

import RatioGrid from "./RatioGrid";
import RatioCard from "./RatioCard";

interface RatioItem {
  title: string;
  value: number | string;
  suffix?: string;
  description?: string;
  positive?: boolean;
}

interface Props {
  title: string;
  description?: string;
  ratios: RatioItem[];
}

export default function RatioCategory({
  title,
  description,
  ratios,
}: Props) {
  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-slate-400">
            {description}
          </p>
        )}

      </div>

      <RatioGrid>

        {ratios.map((ratio) => (

          <RatioCard
            key={ratio.title}
            title={ratio.title}
            value={ratio.value}
            suffix={ratio.suffix}
            description={ratio.description}
            positive={ratio.positive}
          />

        ))}

      </RatioGrid>

    </section>
  );
}