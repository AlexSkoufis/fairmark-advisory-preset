import Hero from "@/components/home/Hero";
import ClientLogos from "@/components/home/ClientLogos";
import Problem from "@/components/home/Problem";
import Process from "@/components/home/Process";
import Programs from "@/components/home/Programs";
import Difference from "@/components/home/Difference";
import Finn from "@/components/home/Finn";
import Numbers from "@/components/home/Numbers";
import Testimonials from "@/components/home/Testimonials";
import Estimate from "@/components/home/Estimate";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Problem />
      <Process />
      <Programs />
      <Difference />
      <Finn />
      <Numbers />
      <Testimonials />
      <Estimate />
      <FinalCta />
    </>
  );
}
