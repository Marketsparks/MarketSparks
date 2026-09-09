"use client";

import { useState } from "react";

import { Trash2 } from "lucide-react";

import { DeleteAccountDialog } from "./DeleteAccountDialog";

export function DangerZone() {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <section
        className="
          mt-60
          mb-20
        "
      >
<button
  type="button"
  onClick={() => setOpen(true)}
  className="
    inline-flex
    items-center
    gap-1.5
    sm:gap-2
    rounded-[var(--user-radius-md)]
    border
    border-[var(--user-danger)]
    px-3
    sm:px-5
    py-2
    sm:py-3
    text-[13px]
    sm:text-base
    font-medium
    text-[var(--user-danger)]
    transition-colors
    duration-300
    hover:bg-[var(--user-danger)]
    hover:text-white
  "
>
  <Trash2
    size={16}
    className="sm:h-[18px] sm:w-[18px]"
  />

  Delete Account
</button>
      </section>

      <DeleteAccountDialog
        open={open}
        onClose={() =>
          setOpen(false)
        }
      />
    </>
  );
}