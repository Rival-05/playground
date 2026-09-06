"use client";

import Link from "next/link";
import type { BlogPostMeta } from "@/lib/mdx";
import HoverImagePreview from "@/components/HoverImagePreview";

type PostCardPost = Pick<
  BlogPostMeta,
  "slug" | "title" | "readingTime" | "coverImage"
>;

type PostCardProps = {
  post: PostCardPost;
  month: string;
  isDimmed?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
};

const cardClassName =
  "group flex items-center justify-between gap-4 tracking-wide transition-[opacity,filter] duration-300 ease-out";
const headingClassName =
  "font-normal text-sm text-foreground/80 transition-all duration-200 group-hover:translate-x-1 ";
const metaClassName =
  "font-light text-sm shrink-0 text-foreground/80 gap-1 flex items-center";

function PostCard({
  post,
  month,
  isDimmed = false,
  onHoverStart,
  onHoverEnd,
}: PostCardProps) {
  const card = (
    <Link
      href={`/blog/${post.slug}`}
      aria-label={`Read ${post.title}`}
      className={cardClassName}
      data-cuelume-hover="tick"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        opacity: isDimmed ? 0.4 : 1,
        filter: isDimmed ? "blur(3px)" : "blur(0px)",
      }}
    >
      <h2 className={headingClassName}>{post.title}</h2>
      <div className={metaClassName}>
        <span>{month}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime}</span>
      </div>
    </Link>
  );

  return post.coverImage ? (
    <HoverImagePreview imageSrc={post.coverImage} imageAlt={post.title}>
      {card}
    </HoverImagePreview>
  ) : (
    card
  );
}

export default PostCard;
