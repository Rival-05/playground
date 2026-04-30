import type { ReactNode } from "react";

type Containerprops = {
  children: ReactNode;
};

export function Container({ children }: Containerprops) {
  return (
    <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center px-2 py-1.5 sm:py-3 space-y-3">
      {children}
    </div>
  );
}
