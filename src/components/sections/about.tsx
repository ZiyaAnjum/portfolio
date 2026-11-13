"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, GraduationCap, Code2, User } from "lucide-react";
import { cn } from "@/lib/utils";

const QUICK_FACTS = [
  {
    icon: <MapPin className="w-4 h-4 text-rose-500 shrink-0" />,
    label: "Based in Shiroor, India",
  },
  {
    icon: <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />,
    label: "B.E. AI & ML, 2028",
  },
  {
    icon: <Code2 className="w-4 h-4 text-primary shrink-0" />,
    label: "Focus: full-stack MERN and applied ML",
  },
];

const AboutSection = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <SectionWrapper
      id="about"
      className="flex flex-col items-center justify-center min-h-[70vh] py-16 md:py-24 px-4"
    >
      <div className="w-full max-w-5xl mx-auto">
        <SectionHeader
          id="about"
          title="About Me"
          desc="Who I am and what I love building."
          className="mb-12 md:mb-16 mt-0"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Card className="bg-card text-card-foreground border-border shadow-sm overflow-hidden">
            <CardContent className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                {/* Photo on left, stacked on mobile */}
                <div className="shrink-0 w-full max-w-[240px] sm:max-w-[280px] aspect-[4/5] relative rounded-2xl overflow-hidden border border-border bg-muted/40 shadow-sm">
                  {!imgError ? (
                    <Image
                      src="/assets/ziya.jpg"
                      alt="Ziya Anjum"
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className="object-cover rounded-2xl transition-all duration-300"
                      onError={() => setImgError(true)}
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-muted to-muted/80 p-6 text-center">
                      <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mb-3 text-primary font-bold text-2xl font-display shadow-inner">
                        <User className="w-10 h-10 text-primary" />
                      </div>
                      <p className="font-semibold text-foreground text-sm">
                        Ziya Anjum
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        AI/ML &amp; Full-Stack
                      </p>
                    </div>
                  )}
                </div>

                {/* Text on right, stacked on mobile */}
                <div className="flex-1 flex flex-col justify-between self-stretch">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold font-display tracking-tight text-foreground mb-4 text-center md:text-left">
                      Ziya Anjum
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-8 text-center md:text-left">
                      I&apos;m Ziya, a B.E. student in Artificial Intelligence &amp; Machine Learning at Anjuman Institute of Technology and Management, Bhatkal. I like building products end to end: React and Node for the app, and ML where it makes the product smarter. I recently interned at Emertxe, where I built HomelyHub, a MERN property booking platform. I&apos;m looking for an internship in full-stack or applied AI.
                    </p>
                  </div>

                  {/* Three quick facts */}
                  <div className="pt-6 border-t border-border flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                    {QUICK_FACTS.map((fact, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-secondary/50 border border-border/60 text-xs sm:text-sm font-medium text-foreground"
                      >
                        {fact.icon}
                        <span>{fact.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;

