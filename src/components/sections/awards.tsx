"use client";

import React from "react";
import { motion } from "motion/react";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, GraduationCap, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AwardItem {
  id: number;
  title: string;
  category: "Award" | "Hackathon";
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
}

const HONORS: AwardItem[] = [
  {
    id: 1,
    title: "Winner, HackSpectra Hackathon (Campus2Career)",
    category: "Hackathon",
    subtitle: "YIT Hackathon",
    description:
      "Built Campus2Career, turning student resumes into personalized skill roadmaps and mock interview preparation.",
    icon: <Trophy className="w-5 h-5 text-amber-400" />,
    badge: "Winner",
  },
  {
    id: 2,
    title: "Winner, Bootcamp Project: Smart Cane (hardware + software)",
    category: "Award",
    subtitle: "Assistive Technology",
    description:
      "Designed and built an assistive smart cane combining ultrasonic obstacle sensors, hardware telemetry, and software alerts.",
    icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
    badge: "Winner",
  },
  {
    id: 3,
    title: "Rabita Award & Student of the Year",
    category: "Award",
    subtitle: "Academic Excellence",
    description:
      "Awarded highest marks in 12th standard and recognized as Student of the Year for outstanding academic and extracurricular distinction.",
    icon: <Award className="w-5 h-5 text-rose-400" />,
    badge: "Top Honor",
  },
];

const CERTIFICATIONS = [
  {
    name: "IBM Machine Learning Professional Certificate",
    issuer: "Coursera",
    tag: "Machine Learning",
  },
  {
    name: "Google AI Essentials",
    issuer: "Coursera",
    tag: "Generative AI",
  },
  {
    name: "AWS AI Practitioner",
    issuer: "Amazon Web Services",
    tag: "Cloud AI",
  },
  {
    name: "DSA for DeepTech Bootcamp",
    issuer: "AICTE",
    tag: "Data Structures & Algorithms",
  },
];

const AwardsSection = () => {
  return (
    <SectionWrapper
      id="awards"
      className="flex flex-col items-center justify-center min-h-[100vh] py-20 px-4"
    >
      <div className="w-full max-w-5xl mx-auto">
        <SectionHeader
          id="awards"
          title="Awards &amp; Certifications"
          desc="Honors, hackathons, and certified milestones."
          className="mb-12 md:mb-16 mt-0"
        />

        {/* Honors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {HONORS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card
                className={cn(
                  "h-full group bg-card text-card-foreground border-border",
                  "hover:border-primary/30 transition-all duration-300",
                  "shadow-sm hover:shadow-md flex flex-col justify-between"
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-secondary/50 border border-border/50 group-hover:bg-secondary transition-colors">
                        {item.icon}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs shrink-0 bg-secondary/30">
                      {item.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-base font-bold tracking-tight mt-3">
                    {item.title}
                  </CardTitle>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">
                    {item.subtitle}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Card className="bg-card text-card-foreground border-border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg font-bold tracking-tight">
                  Professional Certifications
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CERTIFICATIONS.map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-border/60 bg-secondary/20 hover:bg-secondary/40 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-snug">
                        {cert.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{cert.issuer}</span>
                        <span>•</span>
                        <Badge variant="secondary" className="text-[10px] py-0 px-1.5 h-4">
                          {cert.tag}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default AwardsSection;
