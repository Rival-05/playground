import type { ComponentPropsWithoutRef } from "react";

type CodeProps = ComponentPropsWithoutRef<"code">;
type PreProps = ComponentPropsWithoutRef<"pre">;

export const mdxComponents = {
  h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className={`scroll-m-20 text-4xl font-semibold tracking-tight ${className ?? ""}`.trim()}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={`scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className ?? ""}`.trim()}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className ?? ""}`.trim()}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p
      className={`leading-7 text-muted-foreground ${className ?? ""}`.trim()}
      {...props}
    />
  ),
  a: ({ className, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a
      className={`font-medium text-foreground underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground ${className ?? ""}`.trim()}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={`my-6 ml-6 list-disc space-y-2 ${className ?? ""}`.trim()}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={`my-6 ml-6 list-decimal space-y-2 ${className ?? ""}`.trim()}
      {...props}
    />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li
      className={`leading-7 text-muted-foreground ${className ?? ""}`.trim()}
      {...props}
    />
  ),
  blockquote: ({
    className,
    ...props
  }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={`mt-6 border-l-2 border-border pl-6 italic text-muted-foreground ${className ?? ""}`.trim()}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr className={`my-8 border-border ${className ?? ""}`.trim()} {...props} />
  ),
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 w-full overflow-x-auto">
      <table
        className={`w-full border-collapse border border-border text-sm ${className ?? ""}`.trim()}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={`border border-border bg-muted px-4 py-2 text-left font-medium text-foreground ${className ?? ""}`.trim()}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      className={`border border-border px-4 py-2 ${className ?? ""}`.trim()}
      {...props}
    />
  ),
  pre: ({ className, ...props }: PreProps) => (
    <pre
      className={`my-6 overflow-x-auto rounded-2xl border border-border bg-zinc-950 p-4 text-sm text-zinc-100 shadow-sm ${className ?? ""}`.trim()}
      {...props}
    />
  ),
  code: ({ className, children, ...props }: CodeProps) => {
    const isInline = !className;

    if (isInline) {
      return (
        <code
          className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <code className={`font-mono ${className ?? ""}`.trim()} {...props}>
        {children}
      </code>
    );
  },
};
