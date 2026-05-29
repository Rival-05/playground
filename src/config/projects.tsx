import type { ReactNode } from "react";
import FramerIcon from "@/components/technologies/framer";
import IPFSIcon from "@/components/technologies/ipfs";
import NextIcon from "@/components/technologies/next";
import Supabase from "@/components/technologies/supabase";
import TailwindIcon from "@/components/technologies/tailwind";
import TypeScriptIcon from "@/components/technologies/typescript";
import Postman from "@/components/technologies/postman";
import Shadcn from "@/components/technologies/shadcn";

export type TechItem =
  | {
      name: string;
      icon: ReactNode;
    }
  | {
      name: string;
      text: string;
    };

export type ProjectItem = {
  title: string;
  overview: string;
  technologies: TechItem[];
  link: string;
  projectPage: string;
  isworking: true | false;
  image?: string;
  imageDark?: string;
  imageLight?: string;
  description?: string[];
};

export const projects: ProjectItem[] = [
  {
    title: "Credbind",
    overview:
      "A modern credential verification system built to simplify how institutions issue, manage, and verify digital certificates with trust, transparency, and tamper-proof validation.",
    technologies: [
      { name: "Next.js", icon: <NextIcon /> },
      { name: "TypeScript", icon: <TypeScriptIcon /> },
      { name: "Tailwind CSS", icon: <TailwindIcon /> },
      { name: "shadcn/ui", icon: <Shadcn /> },
      { name: "IPFS", icon: <IPFSIcon /> },
      { name: "Supabase", icon: <Supabase /> },
      { name: "Postman", icon: <Postman /> },
    ],
    link: "https://credbind.vercel.app/",
    projectPage: "/projects/credbind",
    isworking: true,
    image: "/credbind.png",
    description: [
      "Built to make certificate verification easier and more reliable for institutions with 24x7 availability.",
      "Issuers can create and share credentials without dealing with complex setups.",
      "Added a simple verification page where anyone can check if a certificate is valid.",
      "Created separate dashboards for issuers and users to keep things organized.",
    ],
  },
  {
    title: "Playground",
    overview:
      "Sleek personal portfolio designed and developed by me to present my latest works, skills and creativity.",
    technologies: [
      { name: "Next.js", icon: <NextIcon /> },
      { name: "TypeScript", icon: <TypeScriptIcon /> },
      { name: "Tailwind CSS", icon: <TailwindIcon /> },
      { name: "shadcn/ui", icon: <Shadcn /> },
      { name: "Framer Motion", icon: <FramerIcon /> },
    ],
    link: "#",
    projectPage: "/projects/playground",
    isworking: true,
    imageDark: "/playground-dark.png",
    imageLight: "/playground-light.png",
    description: [
      "My portfolio displaying recent projects and skills.",
      "Made with responsive interactive components and clean UI.",
      "Added small animations and sound effects using to make it feel smoother and interactive.",
      "I keep updating it as I learn new things and build new projects.",
    ],
  },
];
