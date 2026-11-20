"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import {
  FiArrowRight,
  FiBookOpen,
  FiBriefcase,
  FiClock,
  FiDownload,
  FiGlobe,
  FiMail,
  FiMenu,
  FiUser,
  FiX,
} from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { useTranslation } from "react-i18next";

import { ButtonLink, IconButton, IconLink } from "@/components/ui";
import { homeSections, type HomeSectionId } from "@/config/navigation";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/settings";
import type { ProfilePhoto } from "@/lib/photo";

type MobileMenuProps = {
  locale: Locale;
  /** From getResume() — resolved at build time by the server parent. */
  resume: { href: string; locale: Locale } | null;
  /** Resolved by server parent. */
  photo: ProfilePhoto | null;
  role: string;
  availableText: string;
};

const sectionMeta: Record<
  HomeSectionId,
  {
    number: string;
    icon: IconType;
  }
> = {
  about: { number: "01", icon: FiUser },
  work: { number: "02", icon: FiBriefcase },
  experience: { number: "03", icon: FiClock },
  research: { number: "04", icon: FiBookOpen },
  contact: { number: "05", icon: FiMail },
};

/**
 * High-end interactive Mobile Navigation Hub with personal brand card,
 * numbered editorial section links, live availability, and direct contact dock.
 */
export function MobileMenu({
  locale,
  resume,
  photo,
  role,
  availableText,
}: MobileMenuProps) {
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
        onClick={(event) => event.target === event.currentTarget && close()}
        className="m-0 ms-auto h-dvh max-h-none w-84 max-w-[85vw] border-s border-border/80 bg-surface/95 p-0 text-text shadow-2xl backdrop-blur-xl backdrop:bg-scrim"
      >
        <div className="flex h-full flex-col">
          {/* Header: Personal Identity Card + Close Button */}
          <div className="flex items-center justify-between border-b border-border/70 bg-bg/30 p-5">
            <div className="flex items-center gap-3">
              {photo ? (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.src}
                    alt={t("site.name")}
                    className="size-11 rounded-full border-2 border-accent/40 object-cover shadow-sm"
                  />
                  <span className="absolute end-0 bottom-0 size-3 rounded-full border-2 border-surface bg-emerald-500" />
                </div>
              ) : (
                <div className="flex size-11 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 font-mono text-sm font-bold text-accent">
                  ZF
                </div>
              )}
              <div>
                <p className="text-sm leading-tight font-bold text-text">
                  {t("site.name")}
                </p>
                <p className="mt-0.5 font-mono text-xs text-accent">{role}</p>
              </div>
            </div>
            <IconButton
              label={tActions("menu.close")}
              icon={FiX}
              onClick={close}
              className="size-9 rounded-xl border border-border/80 bg-surface hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
            />
          </div>

          {/* Body: Numbered Section Navigation */}
          <nav
            aria-label={t("nav.sectionsLabel")}
            className="flex-1 overflow-y-auto px-4 py-5"
          >
            <p className="mb-3 px-3 font-mono text-[11px] font-semibold tracking-wider text-muted/80 uppercase">
              {t("nav.sectionsLabel")}
            </p>
            <ul className="space-y-1.5">
              {homeSections.map((section) => {
                const meta = sectionMeta[section.id];
                const Icon = meta.icon;

                return (
                  <li key={section.id}>
                    <Link
                      href={`/${locale}/#${section.id}`}
                      onClick={close}
                      className="group flex items-center justify-between rounded-xl border border-transparent px-3.5 py-3 transition-all duration-200 hover:border-border/80 hover:bg-bg/80 active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3.5">
                        <span className="font-mono text-xs font-semibold text-accent/80 group-hover:text-accent">
                          {meta.number}
                        </span>
                        <div className="flex size-9 items-center justify-center rounded-xl border border-border/70 bg-bg text-muted transition-colors group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent">
                          <Icon className="size-4" />
                        </div>
                        <span className="text-base font-semibold text-text transition-colors group-hover:text-accent">
                          {t(section.labelKey)}
                        </span>
                      </div>
                      <FiArrowRight
                        aria-hidden
                        className="size-4 text-muted/40 transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer: Live Status, CV Download & Direct Social/Contact Dock */}
          <div className="mt-auto space-y-4 border-t border-border/70 bg-bg/40 p-5">
            {/* Live Availability & Location */}
            <div className="flex items-center justify-between text-xs text-muted">
              <span className="inline-flex items-center gap-1.5 font-medium text-text">
                <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
                {availableText}
              </span>
              <span className="font-mono text-[11px] text-muted">
                {profile.location}
              </span>
            </div>

            {/* Resume Action */}
            {resume && (
              <ButtonLink
                href={resume.href}
                hrefLang={resume.locale}
                download
                icon={FiDownload}
                size="sm"
                className="w-full justify-center shadow-xs"
              >
                {tActions("downloadCv")}
              </ButtonLink>
            )}

            {/* Direct Connect Dock */}
            <div className="flex items-center justify-between pt-1">
              <IconLink
                href="https://github.com/ZahraFathollahii"
                label="GitHub"
                icon={SiGithub}
                newTabHint={tActions("newTab")}
              />
              <IconLink
                href="https://www.linkedin.com/in/zahra-fathollahi"
                label="LinkedIn"
                icon={FaLinkedinIn}
                newTabHint={tActions("newTab")}
              />
              <IconLink
                href={profile.whatsapp}
                label="WhatsApp"
                icon={FaWhatsapp}
                newTabHint={tActions("newTab")}
              />
              <IconLink
                href={`mailto:${profile.email}`}
                label="Email"
                icon={FiMail}
              />
              <IconLink
                href="https://ganotic.ir"
                label="Ganotic"
                icon={FiGlobe}
                newTabHint={tActions("newTab")}
              />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
