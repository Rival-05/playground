import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes and technical writing from the playground project.",
};

export default async function BlogPage() {
  const [posts] = await Promise.all([getAllPosts()]);

  return (
    <section className="w-full py-4">
      <div className="space-y-2 py-4">
        <h1 className="text-2xl font-medium tracking-tight text-foreground">
          Latest chronicles
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          Collection of technical writeups and stuff I found impressive.
        </p>
      </div>

      <div className="mt-8 flex flex-col w-full space-y-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
