import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'de', 'fr'],
  defaultLocale: 'en',
  // localePrefix: 'as-needed' makes it so that English stays at `/`,
  // but German goes to `/de` and French goes to `/fr`.
  localePrefix: 'as-needed'
});
 
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
