"use client";

import { useState } from "react";
import PostCard from "@/components/blog/PostCard";
import type { BlogPostMeta } from "@/lib/mdx";

type PostCardPost = Pick<
  BlogPostMeta,
  "slug" | "title" | "readingTime" | "coverImage"
>;

export type YearGroup = {
  year: string;
  posts: { post: PostCardPost; month: string }[];
};

type BlogListProps = {
  yearGroups: YearGroup[];
};

function BlogList({ yearGroups }: BlogListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="mt-6 flex w-full flex-col gap-8">
      {yearGroups.map(({ year, posts }, groupIndex) => {
        const groupOffset = yearGroups
          .slice(0, groupIndex)
          .reduce((count, group) => count + group.posts.length, 0);

        return (
          <section
            key={year}
            className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-4"
          >
            <h2 className="text-[15px] font-light tracking-wide text-muted-foreground">
              {year}
            </h2>
            <div className="flex min-w-0 flex-col gap-3">
              {posts.map(({ post, month }, postIndex) => {
                const index = groupOffset + postIndex;

                return (
                  <PostCard
                    key={post.slug}
                    post={post}
                    month={month}
                    isDimmed={hoveredIndex !== null && hoveredIndex !== index}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  />
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default BlogList;
