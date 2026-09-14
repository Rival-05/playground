import Hero from "@/components/landing/hero";
import BlogPreview from "@/components/landing/blog";
import Tools from "@/components/landing/tools";
import Footer from "@/components/common/footer";
import { Separator } from "@/components/ui/separator";
import { createMetadata } from "@/config/seo";
import { getLastCommitDate } from "@/lib/getlastUpdated";
import { ScrollFadeHint } from "@/components/common/ScrollFadeHint";

export const generateMetadata = () =>
  createMetadata({
    title: "Rajat Tripathi",
    path: "/",
    image: "/home.png",
  });

export default async function Home() {
  return (
    <div>
      <Hero />
      <Separator />
      <BlogPreview />
      <Separator />
      <Tools />
      <Separator />
      <Footer lastUpdatedDate={await getLastCommitDate()} />
      <ScrollFadeHint />
    </div>
  );
}
