import {
  buildBaseEmail,
} from "./base-email";

type PasswordResetEmailOptions = {
  firstName: string;
  resetUrl: string;
};

export function buildPasswordResetEmail({
  firstName,
  resetUrl,
}: PasswordResetEmailOptions) {
  const subject =
    "Reset your MarketSparks password";

  const email =
    buildBaseEmail({
      subject,

      preheader:
        "Reset your MarketSparks password securely.",

      title:
        `Reset your password, ${firstName}`,

      message:
        "We received a request to reset your MarketSparks password. Use the button below to create a new password.",

      button: {
        label:
          "Reset my password",

        url:
          resetUrl,
      },

      footerMessage:
        "This password reset link will expire in 30 minutes. If you did not request a password reset, you can safely ignore this email.",
    });

  const text = [
    `Hi ${firstName},`,
    "",
    "We received a request to reset your MarketSparks password.",
    "",
    "You can create a new password by visiting the link below:",
    "",
    resetUrl,
    "",
    "This password reset link will expire in 30 minutes.",
    "",
    "If you did not request a password reset, you can safely ignore this email.",
    "",
    "MarketSparks",
  ].join("\n");

  return {
    subject,
    html:
      email.html,
    text,
  };
}