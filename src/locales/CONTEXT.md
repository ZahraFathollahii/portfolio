# Translator context

Notes for keys whose wording is ambiguous. JSON can't hold comments, so they live here.
Values starting with `TODO` are unwritten and render nothing (`lib/todo.ts`); `yarn i18n:check` lists them.

| Key                                               | Note                                                                                                                                      |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `common:locale.switchTo`                          | Written in the **target** language (EN file says «فارسی», FA file says "English").                                                        |
| `home:hero.location` / `hero.remote`              | Rendered as separate list items — never join them into one string (bidi).                                                                 |
| `home:about.p3`                                   | "formally verified" = صوری راستی‌آزمایی (formal methods), not "officially approved".                                                      |
| `home:experience.present`                         | End of an ongoing date range: "Oct 2023 – Present" / «مهر ۱۴۰۲ – اکنون».                                                                  |
| `home:research.thesis.title` (fa)                 | Translated from the English title — **confirm against the official Persian title on the thesis**.                                         |
| `home:research.degrees.msc.year` (fa)             | Jalali graduation month/year — TODO until confirmed.                                                                                      |
| `home:research.degrees.gpa`                       | `{{value}}`/`{{scale}}` are pre-formatted with `formatNumber` (Persian digits in FA).                                                     |
| `projects:<slug>.title`                           | Product names. FA uses the Persian brand name where one exists (پایش، پیکوپت، سلام اپراتور، گانوتیک); MSSP stays Latin. **Confirm each.** |
| `projects:<slug>.role`                            | Short "my scope" line on cards/case-study header. `TODO` where the README doesn't state it.                                               |
| `projects:payesh.*`                               | "multi-tenant" → چندسازمانی (each tenant is an organisation).                                                                             |
| `projects:caseStudy.*` vs `actions:viewCaseStudy` | FA avoids the loanword «کیس‌استادی»: headings use plain words, the link says «مطالعه‌ی جزئیات پروژه».                                     |
