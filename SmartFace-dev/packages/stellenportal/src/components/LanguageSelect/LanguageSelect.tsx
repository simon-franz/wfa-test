'use client';

import List from '@hrworks/sui-core/List';
import { Dropdown, DropdownContent, DropdownTrigger } from '@hrworks/sui-shared';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { type Locale, routing, usePathname, useRouter } from '../../i18n/routing';
import { S } from './LanguageSelect.styles';
import type { LanguageSelectProps } from './LanguageSelect.types';

export const LanguageSelect = (props: LanguageSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale() as Locale;
  const t = useTranslations('Languages');

  // TODO: Change type once Select is properly typed
  const onLanguageChange = (val: string | string[]) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: val as Locale },
    );
  };

  const flagMap: Record<Locale, string> = {
    de: 'de',
    en: 'gb',
  };

  // TODO: This component is only temporary and will be replaced in this Issue https://hrworks.atlassian.net/browse/FE-3399
  // So please ignore the problems it comes with (hover and colors are not ideal for instance)

  return (
    <Dropdown {...props}>
      <DropdownTrigger>
        <S.Image src={`https://flagcdn.com/w40/${flagMap[locale]}.png`} alt={locale} />
      </DropdownTrigger>
      <DropdownContent>
        <S.DropdownContainer>
          <List>
            {routing.locales.map((_locale) => (
              <S.ListItem key={_locale} onClick={() => onLanguageChange(_locale)}>
                <S.Image src={`https://flagcdn.com/w40/${flagMap[_locale]}.png`} alt={_locale} />
                {t(_locale)}
              </S.ListItem>
            ))}
          </List>
        </S.DropdownContainer>
      </DropdownContent>
    </Dropdown>
  );
};
