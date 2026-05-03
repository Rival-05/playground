import type { Metadata } from "next";

const siteUrl = "https://playgroundd.vercel.app";

export const seo = {
    title: "Playground",
    description: "Sleek portfolio designed and built by Rajat Tripathi.",
    url: siteUrl,
    image: "/playground-light.png",
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
        title,
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
