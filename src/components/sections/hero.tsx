import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Download, MapPin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { config } from "@/data/config";

import SectionWrapper from "../ui/section-wrapper";

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <SectionWrapper id="hero" className={cn("relative w-full min-h-screen")}>
      <div className="grid md:grid-cols-2">
        <div
          className={cn(
            "min-h-[calc(100dvh-3rem)] md:min-h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex flex-col justify-start md:justify-center items-center md:items-start",
            "pt-28 pb-16 sm:pb-20 md:p-16 lg:p-20 xl:p-24"
          )}
        >
          {!isLoading && (
            <div className="flex flex-col max-w-xl">
              <div>
                <BlurIn delay={0.7}>
                  <p
                    className={cn(
                      "md:self-start mt-2 font-medium text-md text-slate-500 dark:text-zinc-400",
                      "cursor-default sm:text-lg md:text-xl whitespace-nowrap bg-clip-text"
                    )}
                  >
                    Hi, I am
                    <br className="md:hidden" />
                  </p>
                </BlurIn>

                <BlurIn delay={1}>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <h1
                        className={cn(
                          "-ml-[4px] leading-none text-transparent text-slate-800 text-left",
                          "font-bold text-6xl md:text-7xl lg:text-8xl xl:text-9xl",
                          "cursor-default text-edge-outline font-display"
                        )}
                      >
                        {config.author.split(" ")[0]}
                        <br className="md:block hidden" />
                        {" "}
                        {config.author.split(" ")[1]}
                      </h1>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="dark:bg-white dark:text-black"
                    >
                      there&apos;s something waiting for you in devtools
                    </TooltipContent>
                  </Tooltip>
                </BlurIn>

                <BlurIn delay={1.2}>
                  <p
                    className={cn(
                      "md:self-start mt-3 font-semibold text-base sm:text-lg md:text-xl text-primary",
                      "cursor-default"
                    )}
                  >
                    AI/ML &amp; Full-Stack Developer
                  </p>
                </BlurIn>

                <div id="about" className="scroll-mt-24">
                  <BlurIn delay={1.4}>
                    <p className="mt-2 text-sm sm:text-base italic text-foreground/90 font-medium">
                      &ldquo;I build and ship full-stack and AI-powered products.&rdquo;
                    </p>
                  </BlurIn>

                  <BlurIn delay={1.5}>
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                      B.E. AI &amp; ML student at Anjuman Institute of Technology and Management,
                      Bhatkal (expected 2028). I build full-stack and AI-powered products,
                      from MERN apps to ML-based tools. Currently seeking a software
                      engineering or applied AI internship.
                    </p>
                  </BlurIn>

                  <BlurIn delay={1.6}>
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span>Shiroor, India</span>
                    </div>
                  </BlurIn>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 w-fit">
                <a
                  href="/resume.pdf"
                  download="Ziya_Anjum_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <BoxReveal delay={1.8} width="100%">
                    <Button className="flex items-center gap-2 w-full">
                      <Download size={18} />
                      <p>Download Resume</p>
                    </Button>
                  </BoxReveal>
                </a>
                <div className="md:self-start flex gap-3 items-center">
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Link href={"#contact"}>
                        <Button
                          variant={"outline"}
                          className="block w-full overflow-hidden"
                        >
                          Hire Me
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Let&apos;s build together 🚀</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex items-center h-full gap-2">
                    <Link
                      href={config.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover"
                      aria-label="GitHub Profile"
                    >
                      <Button variant={"outline"} size="icon" aria-label="GitHub">
                        <FaGithub size={18} />
                      </Button>
                    </Link>
                    <Link
                      href={config.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-can-hover"
                      aria-label="LinkedIn Profile"
                    >
                      <Button variant={"outline"} size="icon" aria-label="LinkedIn">
                        <FaLinkedin size={18} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="grid col-span-1"></div>
      </div>
      <div className="absolute bottom-6 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
