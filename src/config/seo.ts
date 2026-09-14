import type { Metadata } from "next";

const siteUrl = "https://playgroundd.in";

export const seo = {
    title: "Rajat Tripathi",
    description: "Rajat Tripathi's personal site, writing, photography, and curated picks.",
    url: siteUrl,
    image: "/avatar.svg",
} as const;

type SeoOptions = {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
    type?: "website" | "article";
};

export function createMetadata({
    title = seo.title,
    description = seo.description,
    path = "/",
    image = seo.image,
    type = "website",
}: SeoOptions = {}): Metadata {
    const url = new URL(path, seo.url).toString();
    const imageUrl = new URL(image, seo.url).toString();

    return {
        title: title === seo.title ? { absolute: title } : title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            type,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
    };
}

export function absoluteUrl(path: string) {
    return new URL(path, seo.url).toString();
}
