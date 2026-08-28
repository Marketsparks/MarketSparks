import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
  {
    label: "X",
    href: "#",
    icon: FaXTwitter,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-2.5">
      {socials.map(({ label, href, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--foreground)] text-[var(--icon-color)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        >
          <Icon size={14} />
        </Link>
      ))}
    </div>
  );
}