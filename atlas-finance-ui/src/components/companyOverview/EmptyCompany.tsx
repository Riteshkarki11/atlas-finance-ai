"use client";

interface Props {
  title?: string;
}

export default function EmptyCompany({
  title = "Company information unavailable",
}: Props) {

  return (

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center">

      <h2 className="text-3xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-4 text-slate-400">
        Company profile data could not be loaded.
      </p>

    </div>

  );

}