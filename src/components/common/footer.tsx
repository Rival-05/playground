import { Reveal } from "@/components/animations/reveal";
import LastUpdated from "@/components/LastUpdated";
import VisitorCount from "@/components/common/VisitorCount";

export default function Footer({
  lastUpdatedDate,
}: {
  lastUpdatedDate: string;
}) {
  return (
    <Reveal>
      <div className="mx-auto flex w-full max-w-3xl items-start justify-between py-6 text-sm text-muted-foreground sm:items-center">
        <div className="flex flex-col items-start gap-2">
          <LastUpdated date={lastUpdatedDate} />
        </div>
        <div>
          <VisitorCount />
        </div>
      </div>
    </Reveal>
  );
}
