import { S } from './UserCard.styles';
import type { UserCardProps } from './UserCard.types';

export const UserCard = ({ user, selectedUserId, onClick, ...otherProps }: UserCardProps) => {
  const { firstName, lastName, userId } = user;

  return (
    <S.Button
      fullWidth
      variant={selectedUserId === userId ? 'filled' : 'ghost'}
      onClick={() => onClick(userId)}
      {...otherProps}
    >
      {lastName ? (
        <>
          <S.NameWrapper $bold>{lastName}</S.NameWrapper>
          <S.NameWrapper>{firstName}</S.NameWrapper>
          <S.NameWrapper>({userId})</S.NameWrapper>
        </>
      ) : (
        <S.NameWrapper>{userId}</S.NameWrapper>
      )}
    </S.Button>
  );
};
