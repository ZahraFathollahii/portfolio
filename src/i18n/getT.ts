import { createInstance } from "i18next";
import { cache } from "react";

import { resources } from "@/i18n/resources";
import { namespaces, type Locale, type Namespace } from "@/i18n/settings";

// One i18next instance per locale per render pass.
const getInstance = cache(async (locale: Locale) => {
  const instance = createInstance();
  await instance.init({
    lng: locale,
    resources: { [locale]: resources[locale] },
    ns: namespaces,
    defaultNS: "common",
    fallbackLng: false,
    interpolation: { escapeValue: false },
    initAsync: false,
  });
  return instance;
});

/** Server-side translation function for one locale + namespace. */
export async function getT<N extends Namespace>(locale: Locale, ns: N) {
  const instance = await getInstance(locale);
  return instance.getFixedT(locale, ns);
}
