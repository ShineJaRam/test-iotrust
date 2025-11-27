import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { LOCALE_LIST, DEFAULT_LOCALE } from "@/src/constants/locales";

export const routing = defineRouting({
  locales: LOCALE_LIST as unknown as string[],
  defaultLocale: DEFAULT_LOCALE,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
