"use client";

import { ReactNode } from "react";

interface Props {

  children: ReactNode;

}

export default function ToastProvider({

  children,

}: Props) {

  return <>{children}</>;

}