"use client";

import Link from "next/link";
import { memo } from "react";
import Arrowright from "@/components/svgs/arrowright";
import { Button } from "@/components/ui/button";
import type { BlogPostMeta } from "@/lib/mdx";

type PostCardPost = Pick<
  BlogPostMeta,
  "slug" | "title" | "description" | "formattedDate" | "readingTime" | "date"
>;

type PostCardProps = {
  post: PostCardPost;
};

const cardClassName =
  "flex flex-col rounded-lg bg-card/80 shadow-sm ring-1 ring-inset ring-black/10 dark:ring-white/15";

const contentClassName = "flex items-center justify-between px-4 py-2";
const detailsClassName = "space-y-4 py-2";
const headingClassName =
  "text-lg font-medium leading-tight tracking-tight text-foreground";
const descriptionClassName = "text-base text-muted-foreground";
const metaClassName =
  "flex flex-wrap items-center gap-3 text-sm text-muted-foreground";
const separatorClassName = "h-1 w-1 shrink-0 rounded-full bg-foreground";
const actionClassName = "group flex gap-2 cursor-pointer";

function PostCard({ post }: PostCardProps) {
  return (
    <article className={cardClassName}>
      <div className={contentClassName}>
        <div className={detailsClassName}>
          <div className="flex flex-col gap-1">
            <h2 className={headingClassName}>{post.title}</h2>
            <span className={descriptionClassName}>{post.description}</span>
          </div>
          <div className={metaClassName}>
            <time dateTime={post.date}>{post.formattedDate}</time>
            <div className={separatorClassName} aria-hidden="true" />
            <span>{post.readingTime}</span>
          </div>
        </div>

        <Button asChild variant="ghost" className={actionClassName}>
          <Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
            Read
            <Arrowright className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </article>
  );
}

export default memo(PostCard);
