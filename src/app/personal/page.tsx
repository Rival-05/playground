import Link from "next/link";
import Image from "next/image";
import { books } from "@/config/books";
import { movies } from "@/config/movies";
import { Reveal } from "@/components/animations/reveal";

function PersonalCard({
  title,
  detail,
  imageSrc,
  link,
}: {
  title: string;
  detail?: string;
  imageSrc: string;
  link?: string;
}) {
  const content = (
    <div className="group space-y-3" data-cuelume-hover="tick">
      <div className="relative h-32 w-56 overflow-hidden rounded-lg bg-muted ring-1 ring-border/60">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="224px"
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          loading="eager"
        />
      </div>
      <div className="space-y-1">
        <h2 className="text-[15px] font-normal text-foreground/80">{title}</h2>
        {detail && (
          <p className="text-sm font-light leading-6 text-muted-foreground">
            {detail}
          </p>
        )}
      </div>
    </div>
  );

  return link ? (
    <Link href={link} target="_blank" rel="noopener noreferrer">
      {content}
    </Link>
  ) : (
    content
  );
}

export const metadata = {
  title: "Personal",
  description: "Movies and books I have enjoyed.",
};

export default function PersonalPage() {
  return (
    <section className="w-full space-y-10 py-4">
      <Link
        href="/"
        className="link-underline text-sm tracking-wide text-foreground"
        data-cuelume-hover="tick"
      >
        Home
      </Link>

      <Reveal>
        <section className="w-full space-y-6 tracking-wide py-2 md:py-4">
          <h1 className="text-base font-medium text-foreground">Movies</h1>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 md:gap-6">
            {movies.map((movie) => (
              <PersonalCard
                key={movie.title}
                title={movie.title}
                detail={movie.note}
                imageSrc={movie.posterImage}
                link={movie.link}
              />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="w-full space-y-6 tracking-wide py-2 md:py-4">
          <h2 className="text-base font-medium text-foreground">Books</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {books.map((book) => (
              <PersonalCard
                key={book.title}
                title={book.title}
                detail={book.note ?? `by ${book.author}`}
                imageSrc={book.coverImage}
                link={book.link}
              />
            ))}
          </div>
        </section>
      </Reveal>
    </section>
  );
}
