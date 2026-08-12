import Hero from "@/components/landing/hero";
import Contributions from "@/components/landing/contribution";
import BlogPreview from "@/components/landing/blog";
import Tools from "@/components/landing/tools";
import Footer from "@/components/common/footer";
import { Separator } from "@/components/ui/separator";
import { createMetadata } from "@/config/seo";
import { getLastCommitDate } from "@/lib/getlastUpdated";

export const generateMetadata = () => createMetadata({ path: "/" });

export default function Home() {
  return (
    <div>
      <Hero />
      <Contributions />
      <BlogPreview />
      <Tools />
      <Separator />
      <Footer lastUpdatedDate={getLastCommitDate()} />
    </div>
  );
}
