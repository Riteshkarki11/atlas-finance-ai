"use client";

interface Props {
  onRetry: () => void;
}

export default function RetryButton({
  onRetry,
}: Props) {

  return (

    <button
      onClick={onRetry}
      className="
        rounded-lg
        bg-blue-600
        px-6
        py-3
        font-medium
        text-white
        hover:bg-blue-500
      "
    >
      Retry
    </button>

  );

}