import enActions from "@/locales/en/actions.json";
import enCommon from "@/locales/en/common.json";
import enErrors from "@/locales/en/errors.json";
import enHome from "@/locales/en/home.json";
import enProjects from "@/locales/en/projects.json";
import faActions from "@/locales/fa/actions.json";
import faCommon from "@/locales/fa/common.json";
import faErrors from "@/locales/fa/errors.json";
import faHome from "@/locales/fa/home.json";
import faProjects from "@/locales/fa/projects.json";
import type { ClientNamespace, Locale, Namespace } from "@/i18n/settings";

const en = {
  common: enCommon,
  actions: enActions,
  home: enHome,
  projects: enProjects,
  errors: enErrors,
};

export type Resources = typeof en;

export type ClientResources = Pick<Resources, ClientNamespace>;

// EN is the type source; FA must have the same shape (full parity: `yarn i18n:check`).
export const resources: Record<Locale, Resources & Record<Namespace, unknown>> =
  {
    en,
    fa: {
      common: faCommon,
      actions: faActions,
      home: faHome,
      projects: faProjects,
      errors: faErrors,
    },
  };

export function getClientResources(locale: Locale): ClientResources {
  const { common, actions } = resources[locale];
  return { common, actions };
}
