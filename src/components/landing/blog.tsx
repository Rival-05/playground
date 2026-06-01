import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/blog/PostCard";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";

export default async function BlogPreview() {
  const posts = await getAllPosts();
  const preview = posts.slice(0, 2);

  return (
    <Reveal>
      <section className="w-full space-y-4 py-6 md:py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium tracking-tight text-foreground">
            Blogs
          </h2>
        </div>

        <div className="mt-2 flex flex-col w-full space-y-2">
          {preview.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <div className="mt-2 flex justify-center">
        <Link href="/blog">
          <Button className="cursor-pointer" variant="secondary">
            All blogs
          </Button>
        </Link>
      </div>
    </Reveal>
  );
}
