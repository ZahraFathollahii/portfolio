"use client";

import { createInstance } from "i18next";
import { useState, type ReactNode } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";

import type { ClientResources } from "@/i18n/resources";
import { clientNamespaces, type Locale } from "@/i18n/settings";

type I18nProviderProps = {
  locale: Locale;
  /** This locale's client namespaces only — never the full resource set. */
  resources: ClientResources;
  children: ReactNode;
};

export function I18nProvider({
  locale,
  resources,
  children,
}: I18nProviderProps) {
  const [i18n] = useState(() => {
    const instance = createInstance();
    void instance.use(initReactI18next).init({
      lng: locale,
      resources: { [locale]: resources },
      ns: clientNamespaces,
      defaultNS: "common",
      fallbackLng: false,
      interpolation: { escapeValue: false },
      initAsync: false,
      react: { useSuspense: false },
    });
    return instance;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
