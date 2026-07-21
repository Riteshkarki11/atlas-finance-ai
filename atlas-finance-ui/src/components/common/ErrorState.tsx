"use client";

import RetryButton from "./RetryButton";

interface Props {

  title?: string;

  message?: string;

  onRetry?: () => void;

}

export default function ErrorState({

  title = "Something went wrong",

  message = "An unexpected error occurred.",

  onRetry,

}: Props) {

  return (

    <div className="rounded-2xl border border-red-700 bg-slate-900 p-12 text-center">

      <h2 className="text-3xl font-bold text-red-400">

        {title}

      </h2>

      <p className="mt-4 text-slate-300">

        {message}

      </p>

      {onRetry && (

        <div className="mt-8">

          <RetryButton onRetry={onRetry} />

        </div>

      )}

    </div>

  );

}