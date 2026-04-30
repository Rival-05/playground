type ProjectStatusBadgeProps = {
  isworking: boolean;
};

export default function ProjectStatusBadge({
  isworking,
}: ProjectStatusBadgeProps) {
  return (
    <div
      className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs text-foreground/90 tracking-wide ${
        isworking ? " bg-green-500/10" : " bg-red-500/10 "
      }`}
    >
      {isworking ? (
        <>
          <div className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-green-500" />
          </div>
          <span>Live</span>
        </>
      ) : (
        <>
          <div className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
          </div>
          <span>Building</span>
        </>
      )}
    </div>
  );
}
