"use client";

import Skeleton from "./Skeleton";

interface Props {
  cards?: number;
}

export default function PageSkeleton({
  cards = 4,
}: Props) {

  return (

    <div className="space-y-8">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {Array.from({ length: cards }).map((_, i) => (

          <Skeleton
            key={i}
            className="h-32"
          />

        ))}

      </div>

      <Skeleton className="h-96" />

      <Skeleton className="h-[500px]" />

    </div>

  );

}