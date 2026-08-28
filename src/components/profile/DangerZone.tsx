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
          onClick={() =>
            setOpen(true)
          }
          className="
            inline-flex
            items-center
            gap-2
            rounded-[var(--user-radius-md)]
            border
            border-[var(--user-danger)]
            px-5
            py-3
            font-medium
            text-[var(--user-danger)]
            transition-colors
            duration-300
            hover:bg-[var(--user-danger)]
            hover:text-white
          "
        >
          <Trash2 size={18} />

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