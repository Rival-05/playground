import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start justify-between  px-2 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
      <div className="flex flex-col items-start gap-2 ">
        <div className="flex items-center gap-2">
          {currentYear}{" "}
          <Link
            href="https://x.com/Rival_o5"
            className="hover:underline  hover:underline-offset-4 font-medium text-foreground transition-all duration-200"
          >
            Rajat Tripathi
          </Link>{" "}
          <span>All rights reserved.</span>
        </div>
        <span>
          Inspired by{" "}
          <Link
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline hover:underline-offset-4"
          >
            ui.shadcn.com
          </Link>
        </span>
      </div>

      <div>
        You're the{" "}
        <span className="font-semibold text-foreground">38,478th</span> visitor
      </div>
    </div>
  );
}
