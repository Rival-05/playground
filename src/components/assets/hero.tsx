import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full tracking-wide space-y-5 py-8 text-base leading-8 md:py-10">
      <div className="flex items-center gap-3">
        <Image
          src="/shinchan.svg"
          alt="Shinchan"
          width={32}
          height={32}
          className="rounded-full"
        />
        <h2 className="text-lg font-medium leading-tight text-muted-foreground py-4">
          Hey, I&apos;m <span className="text-foreground/80">Rajat.</span>
        </h2>
      </div>

      <h2 className="text-base font-normal text-muted-foreground">
        I&apos;m a <span className="text-brand">software developer</span>,
        passionate about building modern web applications with minimal and sleek
        design.
      </h2>

      <h2 className="text-base font-normal text-muted-foreground">
        I work with Next.js, React, PostgreSQL, and TypeScript to create fast
        and scalable products.
      </h2>

      <h2 className="text-base font-normal text-muted-foreground">
        Apart from coding, you&apos;ll probably find me trying new cuisines,
        exploring new places and ideas, or playing sports whenever I get the
        chance.
      </h2>

      <h2 className="text-base font-normal text-muted-foreground">
        I enjoy being <span className="text-brand">creative</span> and
        constantly improving my skills.
      </h2>
    </section>
  );
}
