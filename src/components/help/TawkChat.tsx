"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API?: {
      customStyle?: {
        visibility: {
          desktop: {
            position: string;
            xOffset: number;
            yOffset: number;
          };
          mobile: {
            position: string;
            xOffset: number;
            yOffset: number;
          };
          bubble: {
            rotate: string;
            xOffset: number;
            yOffset: number;
          };
        };
      };
    };

    Tawk_LoadStart?: Date;
  }
}

export default function TawkChat() {
  useEffect(() => {
    window.Tawk_API = {
      customStyle: {
        visibility: {
          desktop: {
            position: "br",
            xOffset: 20,
            yOffset: 90,
          },

          mobile: {
            position: "br",
            xOffset: 0,
            yOffset: 90,
          },

          bubble: {
            rotate: "0deg",
            xOffset: 0,
            yOffset: 0,
          },
        },
      },
    };

    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");

    script.async = true;

    script.src =
      "https://embed.tawk.to/6a956a936c07cd3443eb15e2/1k1bqgkt9";

    script.charset = "UTF-8";

    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}