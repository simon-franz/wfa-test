import { CarouselItem } from '@hrworks/sui-extension/Carousel';
import { useIsClient } from '@hrworks/sui-shared';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { AppContext } from '../../../App/AppContext';
import { ClockInMethodSelectorContext } from '../../../ClockInMethodSelector/ClockInMethodSelectorContext';
import { S } from './FilterControls.styles';
import type { FilterControlsProps } from './FilterControls.types';
import { NavigationButton } from './NavigationButton';

export const FilterControls = (props: FilterControlsProps) => {
  const t = useTranslations('namePad.filterControls');
  const isClient = useIsClient();
  const { users } = useContext(AppContext);
  const { setSelectedUser, selectedUser, activeFilter, setActiveFilter, setSelectedUsers } =
    useContext(ClockInMethodSelectorContext);

  const sortedDedupedInitials = [...new Set(users?.map((user) => user.userId[0].toUpperCase()))].sort() || [];

  const slidesToShow = isClient ? { xs: 3, sm: 6, lg: 10 } : 10;

  const onActiveFilterChange = (selectedFilter: string) => {
    if (selectedUser !== undefined) {
      setSelectedUser('');
    }

    setActiveFilter(selectedFilter);

    if (selectedFilter === 'all') {
      setSelectedUsers(users);
    } else {
      const filteredUsers = users?.filter((user) => user.userId[0].toUpperCase() === selectedFilter);

      setSelectedUsers(filteredUsers);
    }
  };

  return (
    <S.Carousel
      prevArrow={<NavigationButton direction="prev" />}
      nextArrow={<NavigationButton direction="next" />}
      showPagination={false}
      slidesToShow={slidesToShow}
      {...props}
    >
      <CarouselItem>
        <S.Button fullWidth activeFilter={activeFilter === 'all'} onClick={() => onActiveFilterChange('all')}>
          {t('allUsersButton')}
        </S.Button>
      </CarouselItem>
      {sortedDedupedInitials.map((initial) => (
        <CarouselItem key={initial}>
          <S.Button fullWidth activeFilter={activeFilter === initial} onClick={() => onActiveFilterChange(initial)}>
            {initial}
          </S.Button>
        </CarouselItem>
      ))}
    </S.Carousel>
  );
};
