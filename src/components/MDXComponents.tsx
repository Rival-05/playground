import type { ComponentPropsWithoutRef } from "react";
import { Separator } from "@/components/ui/separator";

const cx = (...c: (string | undefined)[]) => c.filter(Boolean).join(" ");

const headingBaseClassName =
  "scroll-m-20 font-heading tracking-tight text-foreground";

const bodyClassName = "text-base leading-7 text-muted-foreground";
const linkClassName = "font-medium text-foreground";

const listClassName =
  "my-6 ml-6 space-y-2 text-base leading-7 text-muted-foreground";

const inlineCodeClassName =
  "rounded-sm ring-1 ring-inset ring-black/10 dark:ring-white/15 bg-card px-1.5 py-0.5 text-sm text-foreground font-medium";

const preClassName =
  "rounded-sm ring-1 ring-inset ring-black/10 dark:ring-white/15 bg-card px-3 py-4 text-sm text-foreground";

const tableWrapperClassName =
  "my-6 w-full overflow-x-auto rounded-lg border border-border ";

const tableClassName = "w-full text-sm";

const cellClassName =
  "px-4 py-3 align-top text-foreground border-t border-border";

const imageClassName =
  "my-8 rounded-2xl border border-border/60 dark:border-white/10 shadow-sm";

export const mdxComponents = {
  h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className={cx(
        headingBaseClassName,
        "text-3xl font-medium leading-tight",
        className,
      )}
      {...props}
    />
  ),

  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <div className="space-y-3 md:space-y-4">
      <h2
        className={cx(
          headingBaseClassName,
          "text-2xl font-medium leading-tight",
          className,
        )}
        {...props}
      />
      <Separator className="my-0" />
    </div>
  ),

  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cx(
        headingBaseClassName,
        "text-xl font-medium leading-loose",
        className,
      )}
      {...props}
    />
  ),

  h4: ({ className, ...props }: ComponentPropsWithoutRef<"h4">) => (
    <h4
      className={cx(
        headingBaseClassName,
        "text-lg font-medium tracking-wide leading-loose",
        className,
      )}
      {...props}
    />
  ),

  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cx(bodyClassName, className)} {...props} />
  ),

  strong: ({ className, ...props }: ComponentPropsWithoutRef<"strong">) => (
    <strong
      className={cx("font-medium text-foreground", className)}
      {...props}
    />
  ),

  em: ({ className, ...props }: ComponentPropsWithoutRef<"em">) => (
    <em className={cx("italic text-foreground", className)} {...props} />
  ),

  a: ({ className, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a className={cx("link-underline", linkClassName, className)} {...props} />
  ),

  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cx(listClassName, "list-disc", className)} {...props} />
  ),

  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol className={cx(listClassName, "list-decimal", className)} {...props} />
  ),

  li: ({ className, ...props }: ComponentPropsWithoutRef<"li">) => (
    <li className={cx("marker:text-muted-foreground", className)} {...props} />
  ),

  blockquote: ({
    className,
    ...props
  }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cx(
        "my-6 border-l-2 border-border/60 dark:border-white/10 pl-4 italic text-muted-foreground md:pl-6",
        className,
      )}
      {...props}
    />
  ),

  hr: () => <Separator className="my-8 md:my-10" />,

  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre className={cx(preClassName, className)} {...props} />
  ),

  code: ({
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<"code">) => {
    const isInline = !className?.includes("language-");

    if (isInline) {
      return (
        <code className={inlineCodeClassName} {...props}>
          {children}
        </code>
      );
    }

    return (
      <code className={cx("text-sm text-foreground", className)} {...props}>
        {children}
      </code>
    );
  },

  img: ({ className, ...props }: ComponentPropsWithoutRef<"img">) => (
    <img className={cx(imageClassName, className)} {...props} />
  ),

  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className={tableWrapperClassName}>
      <table className={cx(tableClassName, className)} {...props} />
    </div>
  ),

  thead: ({ className, ...props }: ComponentPropsWithoutRef<"thead">) => (
    <thead className={cx("bg-muted border-border", className)} {...props} />
  ),

  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={cx(
        "px-4 py-3 text-left font-medium text-foreground",
        className,
      )}
      {...props}
    />
  ),

  tbody: ({ className, ...props }: ComponentPropsWithoutRef<"tbody">) => (
    <tbody className={cx("divide-y divide-border", className)} {...props} />
  ),

  tr: ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => (
    <tr
      className={cx("transition-colors hover:bg-muted", className)}
      {...props}
    />
  ),

  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td className={cx(cellClassName, className)} {...props} />
  ),
};
