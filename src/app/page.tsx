import Hero from "@/components/landing/hero";
import Contributions from "@/components/landing/contribution";
import Projects from "@/components/landing/projects";
import Tools from "@/components/landing/tools";
import Footer from "@/components/common/footer";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div>
      <Hero />
      <Contributions />
      <Projects />
      <Tools />
      <Separator />
      <Footer />
    </div>
  );
}
