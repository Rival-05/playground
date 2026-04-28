import Hero from "@/components/assets/hero";
import Contributions from "@/components/assets/contribution";
import Projects from "@/components/assets/projects";
import Tools from "@/components/assets/tools";
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
