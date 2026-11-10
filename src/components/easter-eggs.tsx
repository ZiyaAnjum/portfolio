"use client";
import { useDevToolsOpen } from "@/hooks/use-devtools-open";
import React, { useEffect } from "react";
import NyanCat from "./nyan-cat";

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();
  useEffect(() => {
    if (!isDevToolsOpen) return;
    if (typeof console !== "undefined") {
      console.clear();
      console.log(
        "%cWhoa, look at you! 🕵️‍♂️\n" +
          "You discovered the secret console! 🔍\n" +
          "Want to see some magic? ✨\n" +
          "Just type %cziya%c and hit Enter! 🎩🐇",
        "color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px",
        "color: #00FF00; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px",
        "color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
      );

      ["ziya", "Ziya", "ZIYA"].forEach((name) => {
        // @ts-ignore
        if (Object.hasOwn(window, name)) return;
        Object.defineProperty(window, name, {
          get() {
            console.log(
              "%c✨ Abra Kadabra! ✨\n\n" +
                "You just summoned the magic of Ziya! 🧙‍♂️\n" +
                "Ready to build and ship full-stack and AI products together? 💻⚡",
              "color: #FF4500; font-size: 18px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:10px"
            );

            const timer = setTimeout(() => {
              console.log(
                "%cPssttt! 🤫\n\n" +
                  "Do you like cats? 😺 If yes, press 'z' on the viewport and see what happens! 🐱✨",
                "color: #FF69B4; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
              );
              clearTimeout(timer);
            }, 5000);
            return "";
          },
        });
      });
    }
  }, [isDevToolsOpen]);

  return (
    <>
      <NyanCat />
    </>
  );
};

export default EasterEggs;
