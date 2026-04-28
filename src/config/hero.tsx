import type { ComponentType } from "react";
import Github from "@/components/socials/github";
import Mail from "@/components/socials/mail";
import Linkedin from "@/components/socials/linkedin";
import Twitter from "@/components/socials/twitter";

export type HeroLink = {
  label: string;
  href: string;
  icon: ComponentType;
};

export const heroLinks: HeroLink[] = [
  {
    label: "github",
    href: "https://github.com/Rival-05",
    icon: Github,
  },
  {
    label: "mail",
    href: "mailto:rivalo3.chat@gmail.com",
    icon: Mail,
  },
  {
    label: "linkedin",
    href: "https://www.linkedin.com/in/rivalo5/",
    icon: Linkedin,
  },
  {
    label: "@Rival_o5",
    href: "https://x.com/Rival_o5",
    icon: Twitter,
  },
];
