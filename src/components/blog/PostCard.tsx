"use client";

import Link from "next/link";
import { memo } from "react";
import Arrowright from "@/components/svgs/arrowright";
import type { BlogPostMeta } from "@/lib/mdx";

type PostCardPost = Pick<
  BlogPostMeta,
  "slug" | "title" | "description" | "formattedDate" | "readingTime" | "date"
>;

type PostCardProps = {
  post: PostCardPost;
};

const cardClassName =
  "group flex flex-col rounded-lg bg-card hover:bg-muted/70 shadow";
const contentClassName = "flex items-center justify-between px-4 py-2";
const detailsClassName = "space-y-3 py-2";
const headingClassName = "text-lg font-medium text-foreground/80";
const descriptionClassName = "text-base text-muted-foreground text-wrap";
const metaClassName =
  "flex flex-wrap items-center gap-3 text-sm text-muted-foreground";
const separatorClassName = "h-1 w-1 shrink-0 rounded-full bg-foreground";
const actionClassName =
  "hidden md:inline-flex font-medium text-sm items-center gap-1 text-muted-foreground group-hover:text-foreground";

function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`Read ${post.title}`}
      className={cardClassName}
    >
      <div className={contentClassName}>
        <div className={detailsClassName}>
          <div className="flex flex-col gap-0.5">
            <h2 className={headingClassName}>{post.title}</h2>
            <span className={descriptionClassName}>{post.description}</span>
          </div>
          <div className={metaClassName}>
            <time dateTime={post.date}>{post.formattedDate}</time>
            <div className={separatorClassName} aria-hidden="true" />
            <span>{post.readingTime}</span>
          </div>
        </div>

        <div className={actionClassName}>
          Read
          <Arrowright className="transition-transform group-hover:translate-x-1 duration-300" />
        </div>
      </div>
    </Link>
  );
}

export default memo(PostCard);
