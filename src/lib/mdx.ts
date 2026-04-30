import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { format } from "date-fns";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export type BlogFrontmatter = {
    title: string;
    date: string;
    description: string;
    image?: string;
};

export type BlogPost = BlogFrontmatter & {
    slug: string;
    content: string;
    readingTime: string;
    formattedDate: string;
};

export type BlogPostMeta = Omit<BlogPost, "content">;

function stripMdxContent(content: string) {
    return content
        .replace(/^---[\s\S]*?---\s*/m, "")
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
        .replace(/<[^>]+>/g, " ")
        .replace(/[#>*_~=-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function calculateReadingTime(content: string) {
    const words = stripMdxContent(content).split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min read`;
}

function formatPostDate(date: string) {
    return format(new Date(date), "dd.MM.yyyy");
}

async function readContentFile(slug: string) {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContent = await fs.readFile(fullPath, "utf8");
    return matter(fileContent);
}

async function resolvePostImage(slug: string, image?: string) {
    if (image) {
        return image;
    }

    const imageDirectory = path.join(process.cwd(), "public", "blog-images");
    const extensions = ["png", "jpg", "jpeg", "webp", "avif", "gif"];

    for (const extension of extensions) {
        const assetPath = `/blog-images/${slug}.${extension}`;
        const fullPath = path.join(imageDirectory, `${slug}.${extension}`);

        try {
            await fs.access(fullPath);
            return assetPath;
        } catch {
            // Try the next common extension.
        }
    }

    return undefined;
}

export const getPostSlugs = cache(async function getPostSlugs() {
    const entries = await fs.readdir(contentDirectory, { withFileTypes: true });

    return entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
        .map((entry) => entry.name.replace(/\.mdx$/, ""));
});

export const getPostBySlug = cache(async function getPostBySlug(slug: string) {
    const { data, content } = await readContentFile(slug);
    const frontmatter = data as Partial<BlogFrontmatter>;

    if (!frontmatter.title || !frontmatter.date || !frontmatter.description) {
        throw new Error(`Post \"${slug}\" is missing required frontmatter.`);
    }

    return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        description: frontmatter.description,
        image: await resolvePostImage(slug, frontmatter.image),
        content,
        readingTime: calculateReadingTime(content),
        formattedDate: formatPostDate(frontmatter.date),
    } satisfies BlogPost;
});

export const getAllPosts = cache(async function getAllPosts() {
    const slugs = await getPostSlugs();
    const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

    return posts.sort(
        (firstPost, secondPost) =>
            new Date(secondPost.date).getTime() - new Date(firstPost.date).getTime(),
    );
});
