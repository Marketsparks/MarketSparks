"use client";

import { ChevronDown, Mail, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

import { Container } from "@/components/layout";

import { useCart } from "@/components/Cart";

const socialClass =
  "flex h-7 w-7 items-center justify-center rounded-md border border-[var(--foreground)] text-[var(--icon-color)] transition-all duration-200 hover:border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]";

const languages = [
  { code: "en", label: "🇬🇧 English" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "fr", label: "🇫🇷 Français" },
  { code: "de", label: "🇩🇪 Deutsch" },
  { code: "zh", label: "🇨🇳 中文" },
];

export default function TopBar() {
  const { cartOpen } = useCart();
  return (
<div
  className={[
    "pb-6 pt-6 hidden h-[50px] bg-[var(--surface-topbar)] shadow-sm lg:block transition-all duration-300",
    cartOpen &&
      "pointer-events-none -translate-y-full opacity-0",
  ]
    .filter(Boolean)
    .join(" ")}
>
      <Container className="flex h-full items-center justify-between">
        <div className="flex items-center gap-2">
          <a href="#" aria-label="Facebook" className={socialClass}>
            <FaFacebookF size={13} />
          </a>

          <a href="#" aria-label="Twitter" className={socialClass}>
            <FaXTwitter size={13} />
          </a>

          <a href="#" aria-label="Instagram" className={socialClass}>
            <FaInstagram size={13} />
          </a>

          <a href="#" aria-label="LinkedIn" className={socialClass}>
            <FaLinkedinIn size={13} />
          </a>
        </div>

        <div className="flex items-center gap-5 text-[13px] text-[var(--foreground)]">
          <div className="relative">
            <select
              defaultValue="en"
              className="cursor-pointer appearance-none bg-transparent pr-5 text-[13px] font-medium text-[var(--foreground)] outline-none transition-colors duration-200 hover:text-[var(--primary)]"
            >
              {languages.map((language) => (
                <option
                  key={language.code}
                  value={language.code}
                >
                  {language.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={13}
              strokeWidth={2.2}
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[var(--foreground)]"
            />
          </div>

          <a
            href="tel:+2348000000000"
            className="flex items-center gap-2 transition-colors duration-200 hover:text-[var(--primary)]"
          >
            <Phone size={14} />
            <span>+234 800 000 0000</span>
          </a>

          <a
            href="mailto:contact@marketsparks.top"
            className="flex items-center gap-2 transition-colors duration-200 hover:text-[var(--primary)]"
          >
            <Mail size={14} />
            <span>contact@marketsparks.top</span>
          </a>
        </div>
      </Container>
    </div>
  );
}