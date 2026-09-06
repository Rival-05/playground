"use client";

import { bind } from "cuelume";
import { useEffect } from "react";
import type { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    bind();
  }, []);

  return children;
}
