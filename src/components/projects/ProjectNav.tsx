import Link from "next/link";
import { Button } from "@/components/ui/button";
import ArrowRight from "@/components/svgs/arrowright";
import ArrowLeft from "@/components/svgs/arrowleft";

type Props = {
  prevHref: string;
  nextHref: string;
  prevLabel?: string;
  nextLabel?: string;
};

export default function ProjectNav({
  prevHref,
  nextHref,
  prevLabel = "Back",
  nextLabel = "Next",
}: Props) {
  return (
    <div className="flex gap-3 items-center justify-center">
      <Button asChild variant="ghost">
        <Link href={prevHref} className="group inline-flex items-center gap-2">
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span>{prevLabel}</span>
        </Link>
      </Button>

      <Button asChild>
        <Link href={nextHref} className="group inline-flex items-center gap-2">
          <span>{nextLabel}</span>
          <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </Button>
    </div>
  );
}
