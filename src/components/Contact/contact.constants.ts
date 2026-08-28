import type {
  ContactMethod,
  SocialLink,
} from "./contact.types";

export const CONTACT_HERO = {
  title: "Get In Touch",

  description:
    "Have a question, partnership inquiry, or need help with one of our resources? We'd love to hear from you.",
};

export const CONTACT_INTRO = {
  title: "Let's Talk",

  description:
    "Whether you're looking for guidance, have questions about our resources, or want to discuss a potential collaboration, we're always happy to hear from you.",
};

export const CONTACT_METHODS: ContactMethod[] = [
  {
    title: "Phone",

    value: "+234 434 343 5344",

    href: "tel:+2344343435344",
  },

  {
    title: "Email",

    value: "contact@marketsparks.top",

    href: "mailto:contact@marketsparks.top",
  },

  {
    title: "Response Time",

    value: "Within 24 business hours",
  },
];

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "#",
  },

  {
    name: "Instagram",
    href: "#",
  },

  {
    name: "X",
    href: "#",
  },

  {
    name: "LinkedIn",
    href: "#",
  },
];

export const CONTACT_CTA = {
  title: "Still Have Questions?",

  description:
    "Reach out anytime and we'll do our best to point you in the right direction.",

  button: "Send Us A Message",
};