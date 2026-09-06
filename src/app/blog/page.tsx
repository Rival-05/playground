import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import BlogList, { type YearGroup } from "@/components/blog/BlogList";
import Link from "next/link";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Blog",
  description: "Interesting and technical writing.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  const groupsMap = posts.reduce<Map<string, YearGroup["posts"]>>(
    (groups, post) => {
      const year = format(new Date(post.date), "yyyy");
      const yearPosts = groups.get(year) ?? [];

      yearPosts.push({ post, month: format(new Date(post.date), "MMM") });
      groups.set(year, yearPosts);
      return groups;
    },
    new Map(),
  );

  const yearGroups: YearGroup[] = [...groupsMap.entries()].map(
    ([year, posts]) => ({ year, posts }),
  );

  return (
    <section className="w-full py-4">
      <div className="space-y-3 py-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 link-underline text-sm text-foreground tracking-wide"
          data-cuelume-hover="tick"
        >
          <span>Home</span>
        </Link>

        <h1 className="text-xl font-medium tracking-normal text-foreground">
          Archive
        </h1>
      </div>

      <BlogList yearGroups={yearGroups} />
    </section>
  );
}
