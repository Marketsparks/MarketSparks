import Link from "next/link";

import { Container } from "@/components/layout";

const legalLinks = [
  {
    label: "Terms of Service",
    href: "/Terms",
  },
  {
    label: "Privacy Policy",
    href: "/Privacy",
  },
  {
    label: "Refund Policy",
    href: "/Refund",
  },
];

export default function FooterBottom() {
  return (
    <div className="border-t border-[var(--border)] bg-[var(--surface-footer-bottom)]">
      <Container className="py-5">
        <div className="flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:text-left">
          <p className="text-sm text-[var(--foreground-muted)]">
            © {new Date().getFullYear()} MarketSparks. All rights reserved.
          </p>

          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-y-2">
              {legalLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="flex items-center"
                >
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="mx-4 text-lg font-bold leading-none text-[var(--foreground)]"
                    >
                      •
                    </span>
                  )}

                  <Link
                    href={link.href}
                    className="text-sm text-[var(--foreground-muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
}