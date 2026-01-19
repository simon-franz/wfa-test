'use client';

import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import { MaterialDesignIcon } from '@hrworks/sui-core/MaterialDesignIcon';
import Select from '@hrworks/sui-core/Select';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useActionState, useRef, useState, useTransition } from 'react';

import { Button } from '../Button';
import { S } from './Search.styles';
import type { SearchProps } from './Search.types';

export const Search = ({ searchOptions }: SearchProps) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [expanded, setExpanded] = useState(false);
  const searchQuery = searchParams.get('searchQuery') || '';

  const addParams = (_prevState: unknown, formData: FormData) => {
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      const stringValue = value.toString().trim();
      if (stringValue && stringValue !== 'all') {
        params.set(key, stringValue);
      }
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== 'all') {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const onReset = () => {
    formRef.current?.reset();

    startTransition(() => {
      router.push(window.location.pathname, { scroll: false });
    });
  };

  const onResetSearchQuery = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('searchQuery');

    startTransition(() => {
      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  const [, formAction] = useActionState(addParams, null);

  return (
    <S.Container>
      <form action={formAction} ref={formRef}>
        <Grid>
          <GridItem>
            <S.InputContainer>
              <S.TextField
                name="searchQuery"
                defaultValue={searchQuery}
                placeholder={t('Main.search')}
                aria-label="Search"
                {...(searchQuery.trim() && {
                  renderButton: (buttonStyles) => (
                    <Button css={buttonStyles} variant="unstyled" onClick={onResetSearchQuery}>
                      <MaterialDesignIcon name="close" />
                    </Button>
                  ),
                })}
              />

              <Button type="submit" disabled={isPending}>
                {t('Main.search')}
              </Button>
            </S.InputContainer>
          </GridItem>
          <GridItem>
            <S.Section
              title={t('Main.advanced-search')}
              collapsible
              expanded={expanded}
              onExpandedChange={() => setExpanded(!expanded)}
            >
              <S.SectionContainer>
                <Grid size={{ xs: 'default', sm: 4 }}>
                  <GridItem>
                    <Select
                      name="location"
                      label={t('Job.place-of-work-type')}
                      options={searchOptions.placeOfWorkType}
                      onValueChange={(value) => handleSelectChange('location', value)}
                      value={searchParams.get('location') || 'all'}
                    />
                  </GridItem>
                  <GridItem>
                    <Select
                      name="discipline"
                      label={t('Job.scope-of-activities')}
                      options={searchOptions.scopeOfActivities}
                      onValueChange={(value) => handleSelectChange('discipline', value)}
                      value={searchParams.get('discipline') || 'all'}
                    />
                  </GridItem>
                  <GridItem>
                    <Select
                      name="level"
                      label={t('Job.carreer-level')}
                      options={searchOptions.carreerLevel}
                      onValueChange={(value) => handleSelectChange('level', value)}
                      value={searchParams.get('level') || 'all'}
                    />
                  </GridItem>
                  <GridItem>
                    <Select
                      name="employmentContractKey"
                      label={t('Job.employmentContractType')}
                      options={searchOptions.employmentContractType}
                      onValueChange={(value) => handleSelectChange('type', value)}
                      value={searchParams.get('type') || 'all'}
                    />
                  </GridItem>
                  <GridItem>
                    <Select
                      name="time"
                      label={t('Job.working-time-model')}
                      options={searchOptions.workingTimeModel}
                      onValueChange={(value) => handleSelectChange('time', value)}
                      value={searchParams.get('time') || 'all'}
                    />
                  </GridItem>
                </Grid>
                <S.ResetButton variant="subtle" onClick={onReset}>
                  {t('Main.reset')}
                </S.ResetButton>
              </S.SectionContainer>
            </S.Section>
          </GridItem>
        </Grid>
      </form>
    </S.Container>
  );
};
