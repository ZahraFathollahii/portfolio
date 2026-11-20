import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { FiGlobe, FiMail, FiPhone } from "react-icons/fi";
import { SiGithub } from "react-icons/si";

import { ButtonLink, Card, Heading, Section } from "@/components/ui";
import { profile } from "@/content/profile";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";

type ContactProps = {
  locale: Locale;
};

export async function Contact({ locale }: ContactProps) {
  const t = await getT(locale, "home");
  const tActions = await getT(locale, "actions");

  return (
    <Section id="contact" title={t("contact.title")}>
      <div className="space-y-8">
        <p className="max-w-2xl text-lead leading-relaxed font-medium text-pretty text-muted">
          {t("contact.body")}
        </p>

        {/* Interactive Contact Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Email Card */}
          <Card className="flex flex-col justify-between border-border/80 bg-surface/60 backdrop-blur-sm transition-all hover:border-accent/40 hover:shadow-card-hover">
            <div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <FiMail className="size-5" />
              </div>
              <Heading level={4} className="mt-4 text-base font-bold text-text">
                {t("contact.emailLabel")}
              </Heading>
              <p className="mt-1 font-mono text-sm text-muted select-all">
                {profile.email}
              </p>
            </div>
            <div className="mt-6">
              <ButtonLink
                href={`mailto:${profile.email}`}
                size="sm"
                icon={FiMail}
                className="w-full justify-center"
              >
                {tActions("sendEmail")}
              </ButtonLink>
            </div>
          </Card>

          {/* Phone & WhatsApp Card */}
          <Card className="flex flex-col justify-between border-border/80 bg-surface/60 backdrop-blur-sm transition-all hover:border-accent/40 hover:shadow-card-hover">
            <div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <FaWhatsapp className="size-5" />
              </div>
              <Heading level={4} className="mt-4 text-base font-bold text-text">
                {t("contact.phoneLabel")}
              </Heading>
              <p
                className="mt-1 font-mono text-sm text-muted select-all"
                dir="ltr"
              >
                {profile.phoneFormatted}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <ButtonLink
                href={profile.whatsapp}
                variant="secondary"
                size="sm"
                icon={FaWhatsapp}
                newTabHint={tActions("newTab")}
                className="flex-1 justify-center"
              >
                {tActions("messageWhatsapp")}
              </ButtonLink>
              <ButtonLink
                href={`tel:${profile.phone}`}
                variant="secondary"
                size="sm"
                icon={FiPhone}
                className="flex-1 justify-center"
              >
                {tActions("callPhone")}
              </ButtonLink>
            </div>
          </Card>

          {/* LinkedIn Card */}
          <Card className="flex flex-col justify-between border-border/80 bg-surface/60 backdrop-blur-sm transition-all hover:border-accent/40 hover:shadow-card-hover">
            <div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400">
                <FaLinkedinIn className="size-5" />
              </div>
              <Heading level={4} className="mt-4 text-base font-bold text-text">
                {t("contact.linkedinLabel")}
              </Heading>
              <p className="mt-1 font-mono text-sm text-muted">
                zahra-fathollahi
              </p>
            </div>
            <div className="mt-6">
              <ButtonLink
                href="https://www.linkedin.com/in/zahra-fathollahi"
                variant="secondary"
                size="sm"
                icon={FaLinkedinIn}
                newTabHint={tActions("newTab")}
                className="w-full justify-center"
              >
                LinkedIn
              </ButtonLink>
            </div>
          </Card>

          {/* GitHub & Startup Card */}
          <Card className="flex flex-col justify-between border-border/80 bg-surface/60 backdrop-blur-sm transition-all hover:border-accent/40 hover:shadow-card-hover">
            <div>
              <div className="flex size-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <SiGithub className="size-5" />
              </div>
              <Heading level={4} className="mt-4 text-base font-bold text-text">
                {t("contact.projectsLabel")}
              </Heading>
              <p className="mt-1 font-mono text-sm text-muted">
                ZahraFathollahii · Ganotic
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <ButtonLink
                href="https://github.com/ZahraFathollahii"
                variant="secondary"
                size="sm"
                icon={SiGithub}
                newTabHint={tActions("newTab")}
                className="flex-1 justify-center"
              >
                GitHub
              </ButtonLink>
              <ButtonLink
                href="https://ganotic.ir"
                variant="secondary"
                size="sm"
                icon={FiGlobe}
                newTabHint={tActions("newTab")}
                className="flex-1 justify-center"
              >
                Ganotic
              </ButtonLink>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
