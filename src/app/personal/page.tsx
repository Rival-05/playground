import Link from "next/link";
import { books } from "@/config/books";
import { movies } from "@/config/movies";
import { resources } from "@/config/resources";
import { Reveal } from "@/components/animations/reveal";
import HoverImagePreview from "@/components/HoverImagePreview";
import ShoutoutForm from "@/components/personal/ShoutoutForm";
import { ScrollFadeHint } from "@/components/common/ScrollFadeHint";
import { createMetadata } from "@/config/seo";

const resourceTagColors: Record<string, string> = {
  dsa: "bg-blue-500/10 text-blue-600 ring-blue-500/20 ",
  "system design": "bg-purple-500/10 text-purple-600 ring-purple-500/20 ",
  blog: "bg-orange-500/10 text-orange-600 ring-orange-500/20 ",
  "machine learning": "bg-green-500/10 text-green-600 ring-green-500/20 ",
  "research paper": "bg-pink-500/10 text-pink-600 ring-pink-500/20 ",
  github: "bg-gray-900/10 text-gray-700 ring-gray-900/20 ",
  course: "bg-yellow-500/10 text-yellow-600 ring-yellow-500/20 ",
  science: "bg-cyan-500/10 text-cyan-600 ring-cyan-500/20 ",
  youtube: "bg-red-500/10 text-red-600 ring-red-500/20 ",
};

function PickRow({
  title,
  category,
  imageSrc,
  link,
  isNew,
  resourceType,
  bookType,
}: {
  title: string;
  category?: string;
  imageSrc?: string;
  link?: string;
  isNew?: boolean;
  resourceType?: string | string[];
  bookType?: string | string[];
}) {
  const tagTypes = resourceType ?? bookType;
  const tags = Array.isArray(tagTypes)
    ? tagTypes
    : tagTypes
      ? tagTypes.split(",").map((tag) => tag.trim())
      : [];

  const row = (
    <div
      className="group flex flex-col items-start gap-1 py-1.5 tracking-wide sm:flex-row sm:items-center sm:justify-between sm:gap-4"
      data-cuelume-hover="tick"
    >
      <div className="flex min-w-0 w-full flex-wrap items-center gap-2 sm:flex-1">
        <span className="max-w-full wrap-break-word font-normal text-sm text-foreground/80 transition-all duration-200 group-hover:translate-x-1 sm:min-w-0 sm:truncate">
          {title}
        </span>
        {isNew && (
          <span className="shrink-0 rounded-sm bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 ring-amber-500/20">
            New
          </span>
        )}
        {tags.map((tag) => (
          <span
            key={tag}
            className={`shrink-0 rounded-sm px-1.5 py-px text-[11px] font-medium ${resourceTagColors[tag] ?? "bg-gray-500"}`}
          >
            {tag}
          </span>
        ))}
      </div>
      {category && (
        <span className="w-full wrap-break-word font-light text-sm text-muted-foreground sm:w-auto sm:shrink-0 sm:text-right">
          {"// "}
          {category}
        </span>
      )}
    </div>
  );

  const content = link ? (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      {row}
    </Link>
  ) : (
    row
  );

  return imageSrc ? (
    <HoverImagePreview imageSrc={imageSrc} imageAlt={title}>
      {content}
    </HoverImagePreview>
  ) : (
    content
  );
}

export const generateMetadata = () =>
  createMetadata({
    title: "Picks",
    description:
      "Books, movies, and useful resources curated by Rajat Tripathi.",
    path: "/personal",
    image: "/picks.png",
  });

export default function PersonalPage() {
  return (
    <section className="w-full space-y-4 py-4">
      <Link
        href="/"
        className="link-underline text-sm tracking-wide text-foreground"
        data-cuelume-hover="tick"
      >
        Home
      </Link>

      <Reveal>
        <ShoutoutForm />
      </Reveal>

      <Reveal>
        <section className="w-full space-y-3 tracking-wide py-2 md:py-4">
          <h2 className="text-base font-medium text-foreground">
            Important Resources
          </h2>
          <div className="flex flex-col">
            {resources.map((resource) => (
              <PickRow
                key={resource.title}
                title={resource.title}
                link={resource.link}
                isNew={resource.isNew}
                category={resource.category}
                imageSrc={resource.imageSrc}
                resourceType={resource.type}
              />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          id="books"
          className="w-full space-y-3 tracking-wide py-2 md:py-4"
        >
          <h2 className="text-base font-medium text-foreground">Books</h2>
          <div className="flex flex-col">
            {books.map((book) => (
              <PickRow
                key={book.title}
                title={book.title}
                category={book.author}
                imageSrc={book.coverImage}
                link={book.link}
                isNew={book.isNew}
                bookType={book.bookType}
              />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          id="movies"
          className="w-full space-y-3 tracking-wide py-2 md:py-4"
        >
          <h1 className="text-base font-medium text-foreground">Movies</h1>
          <div className="flex flex-col">
            {movies.map((movie) => (
              <PickRow
                key={movie.title}
                title={movie.title}
                category={movie.note ?? "Movie"}
                imageSrc={movie.posterImage}
                link={movie.link}
                isNew={movie.isNew}
              />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <p className="max-w-lg text-sm font-light leading-6 text-muted-foreground">
          ~ A running log of technical resources, books and movies that stuck
          with me — hover a title to see it, click to go find it. <br />
          Updated whenever something&apos;s worth passing on.
        </p>
      </Reveal>
      <ScrollFadeHint />
    </section>
  );
}
