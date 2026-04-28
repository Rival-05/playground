// import { heroLinks } from "@/config/hero";

export default function Hero() {
  return (
    <section className="w-full space-y-5 py-8 text-base leading-8 md:py-10">
      <h2 className="text-lg font-medium leading-tight text-muted-foreground py-4">
        Hey, I&apos;m <span className="text-foreground/80">Rajat.</span>
      </h2>

      <h2 className="text-base font-normal text-muted-foreground">
        I&apos;m a software developer, passionate about building modern web
        applications with minimal and sleek design.
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

      {/* <h2 className="flex items-center gap-4 text-base font-normal text-muted-foreground">
        <span>Reach me at</span>
        <span className="inline-flex flex-wrap items-center gap-4 align-middle">
          {heroLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-center gap-1 align-middle underline decoration-muted-foreground/60 underline-offset-5 transition-colors hover:text-foreground"
            >
              <span className="inline-flex items-center justify-center leading-none">
                <link.icon />
              </span>
              <span className="leading-none">{link.label}</span>
            </a>
          ))}
        </span>
      </h2> */}
    </section>
  );
}
