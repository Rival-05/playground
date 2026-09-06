import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/blog/PostCard";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations/reveal";
import { format } from "date-fns";

export default async function BlogPreview() {
  const posts = await getAllPosts();
  const preview = posts.slice(0, 4);

  return (
    <Reveal>
      <section className="w-full space-y-4 py-6 md:py-8">
        <div className="flex items-center justify-between">
          <h2 className=" font-medium text-base tracking-wide text-foreground/80">
            Archive
          </h2>
        </div>

        <div className="mt-2 flex w-full flex-col gap-3">
          {preview.map((post, index) => (
            <div
              key={post.slug}
              className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-4"
            >
              <h3 className="text-[15px] font-light tracking-wide text-muted-foreground">
                {index === 0 ||
                format(new Date(post.date), "yyyy") !==
                  format(new Date(preview[index - 1].date), "yyyy")
                  ? format(new Date(post.date), "yyyy")
                  : null}
              </h3>
              <PostCard
                post={post}
                month={format(new Date(post.date), "MMM")}
                isDimmed={false}
              />
            </div>
          ))}
        </div>
      </section>
      {posts.length > 4 && (
        <div className="mt-2 flex justify-center">
          <Link href="/blog">
            <Button className="cursor-pointer" variant="secondary">
              All blogs
            </Button>
          </Link>
        </div>
      )}
    </Reveal>
  );
}
