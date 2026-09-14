import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/mdx";
import { absoluteUrl } from "@/config/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts();

    return [
        { url: absoluteUrl("/") },
        { url: absoluteUrl("/blog") },
        { url: absoluteUrl("/personal") },
        { url: absoluteUrl("/photography") },
        ...posts.map((post) => ({
            url: absoluteUrl(`/blog/${post.slug}`),
            lastModified: new Date(post.date),
        })),
    ];
}