function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function LastUpdated({ date }: { date: string }) {
  return (
    <p className="text-sm text-muted-foreground/80">
      Updated {formatDate(date)}
    </p>
  );
}
