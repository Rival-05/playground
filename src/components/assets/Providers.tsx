"use client";

import { bind } from "cuelume";
import { useEffect } from "react";

export default function Providers() {
  useEffect(() => {
    bind();
  }, []);

  return null;
}
