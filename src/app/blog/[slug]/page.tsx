import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { format } from "date-fns";
import remarkGfm from "remark-gfm";
import { Separator } from "@/components/ui/separator";
import { mdxComponents } from "@/components/MDXComponents";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import { Button } from "@/components/ui/button";
import ArrowLeft from "@/components/svgs/arrowleft";
import Link from "next/link";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const articleClassName = "w-full space-y-8 py-10 sm:py-12 lg:py-16";
const headerClassName = "space-y-6";
const headingClassName =
  "text-2xl font-medium tracking-tight text-foreground md:text-3xl";
const descriptionClassName = "text-base text-muted-foreground leading-relaxed";
const metaClassName =
  "flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground";
const separatorClassName = "h-1 w-1 shrink-0 rounded-full bg-foreground";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
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
  let post: Awaited<ReturnType<typeof getPostBySlug>> | null = null;

  try {
    post = await getPostBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <article className={articleClassName}>
      <header className={headerClassName}>
        <Button asChild variant="ghost">
          <Link href="/blog" className="group inline-flex items-center gap-2">
            <ArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Blog</span>
          </Link>
        </Button>
        <div className="flex flex-col gap-1">
          <h2 className={headingClassName}>{post.title}</h2>
          <span className={descriptionClassName}>{post.description}</span>
        </div>
        <div className={metaClassName}>
          <time dateTime={post.date}>
            {format(new Date(post.date), "MMMM d, yyyy")}
          </time>
          <span aria-hidden="true" className={separatorClassName} />
          <span>{post.readingTime}</span>
        </div>
      </header>
      <Separator />

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-table:my-0">
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    </article>
  );
}
