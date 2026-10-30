"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { ButtonLink, IconButton } from "@/components/ui";
import { homeSections } from "@/config/navigation";
import type { Locale } from "@/i18n/settings";

type MobileMenuProps = {
  locale: Locale;
  resumeHref: string;
};

/**
 * Native modal <dialog>: showModal() makes the rest of the page inert (focus trap),
 * Esc closes it, and focus returns to the trigger on close.
 */
export function MobileMenu({ locale, resumeHref }: MobileMenuProps) {
  const { t } = useTranslation("common");
  const { t: tActions } = useTranslation("actions");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    dialogRef.current?.showModal();
    setIsOpen(true);
  }

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <IconButton
        label={tActions("menu.open")}
        icon={FiMenu}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={open}
        className="xl:hidden"
      />
      <dialog
        id="mobile-menu"
        ref={dialogRef}
        aria-label={t("menu.title")}
        onClose={() => setIsOpen(false)}
        // The panel fills the dialog box, so a click whose target is the dialog itself hit the backdrop.
        onClick={(event) => event.target === event.currentTarget && close()}
        className="m-0 ms-auto h-dvh max-h-none w-80 max-w-[85vw] border-s border-border bg-surface p-0 text-text backdrop:bg-black/60"
      >
        <div className="flex h-full flex-col gap-8 p-6">
          <div className="flex justify-end">
            <IconButton
              label={tActions("menu.close")}
              icon={FiX}
              onClick={close}
            />
          </div>
          <nav aria-label={t("nav.sectionsLabel")}>
            <ul className="space-y-1">
              {homeSections.map((section) => (
                <li key={section.id}>
                  <Link
                    href={`/${locale}/#${section.id}`}
                    onClick={close}
                    className="block rounded-control px-3 py-2.5 text-lg font-medium transition-colors duration-200 hover:bg-bg hover:text-accent"
                  >
                    {t(section.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ButtonLink
            href={resumeHref}
            download
            icon={FiDownload}
            className="mt-auto"
          >
            {tActions("downloadCv")}
          </ButtonLink>
        </div>
      </dialog>
    </>
  );
}
