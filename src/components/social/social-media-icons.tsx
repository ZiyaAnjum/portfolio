"use client";

import { useInView } from "motion/react";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { config } from "@/data/config";
import Link from "next/link";

const BUTTONS = [
  {
    name: "Github",
    href: config.social.github,
    icon: <FaGithub size={20} />,
  },
  {
    name: "LinkedIn",
    href: config.social.linkedin,
    icon: <FaLinkedin size={20} />,
  },
];

const SocialMediaButtons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const show = useInView(ref, { once: true });
  return (
    <div ref={ref} className="z-10 flex gap-2">
      {show &&
        BUTTONS.map((button) => (
          <Link
            href={button.href}
            key={button.name}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={button.name}
          >
            <Button variant={"ghost"} size="icon" aria-label={button.name}>
              {button.icon}
            </Button>
          </Link>
        ))}
    </div>
  );
};

export default SocialMediaButtons;
