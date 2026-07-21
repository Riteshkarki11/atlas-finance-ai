"use client";

interface Props {

  message: string;

  type?: "success" | "error" | "info";

}

export default function Toast({

  message,

  type = "info",

}: Props) {

  const colors = {

    success: "bg-green-600",

    error: "bg-red-600",

    info: "bg-blue-600",

  };

  return (

    <div
      className={`
        rounded-lg
        px-5
        py-3
        text-white
        shadow-lg
        ${colors[type]}
      `}
    >

      {message}

    </div>

  );

}