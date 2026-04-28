import ThemeToggle from "@/components/ui/Toggle";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavItemGitHub } from "@/components/assets/githubstars";

const Links = [
  { title: "Home", href: "/" },
  { title: "Blogs", href: "/blogs" },
  { title: "Contact", href: "/contact" },
];

type NavbarProps = {
  className?: string;
};

export default function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 max-w-3xl mx-auto backdrop-blur-xl bg-background/40 ",
        className,
      )}
    >
      <div className="mx-auto flex w-full items-center justify-between py-4 px-2">
        <div className="flex gap-5">
          {Links.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <NavItemGitHub />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
