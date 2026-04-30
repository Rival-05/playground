import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import { mdxComponents } from "@/components/MDXComponents";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug: any) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);

    return {
      title: post.title,
      description: post.description,
    };
  } catch {
    return {
      title: "Post not found",
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);

    return (
      <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="space-y-4 border-b border-border pb-8">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Blog post
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.date}>
              {format(new Date(post.date), "MMMM d, yyyy")}
            </time>
            <span aria-hidden="true">•</span>
            <span>{post.readingTime}</span>
          </div>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            {post.description}
          </p>
        </header>

        <div className="prose prose-zinc dark:prose-invert prose-headings:scroll-m-20 prose-a:font-medium prose-a:no-underline hover:prose-a:underline prose-pre:p-0 prose-pre:bg-transparent prose-code:before:content-none prose-code:after:content-none mt-10 max-w-none">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
