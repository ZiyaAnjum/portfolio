import React, { Suspense } from "react";
import Link from "next/link";
import { footer } from "./config";
import { Button } from "../ui/button";
import SocialMediaButtons from "../social/social-media-icons";
import { config } from "@/data/config";

function CopyrightYear() {
  const year = new Date().getFullYear();
  return <>{year}</>;
}

function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-3 border-t border-border px-4 py-6 sm:flex-row md:px-6 sm:justify-between">
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground text-center sm:text-left">
        <p>
          ©{" "}
          <Suspense fallback={null}>
            <CopyrightYear />
          </Suspense>{" "}
          {config.author}. All rights reserved.
        </p>
      </div>
      <SocialMediaButtons />
      <nav className="flex gap-4 sm:gap-6 z-10">
        {footer.map((link, index) => {
          const { title, href } = link;

          return (
            <Link
              className="text-xs underline-offset-4 hover:underline"
              href={href}
              key={`l_${index}`}
            >
              <Button variant={"link"} className="p-0 h-auto text-xs">{title}</Button>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}

export default Footer;
