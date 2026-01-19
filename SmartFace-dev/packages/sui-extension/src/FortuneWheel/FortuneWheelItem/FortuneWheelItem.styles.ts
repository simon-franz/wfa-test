import styled from '@emotion/styled';

const ItemPath = styled.path({
  strokeWidth: 2,
});

const ItemMedia = styled.foreignObject({
  display: 'block',
  svg: {
    width: '100%',
    height: '100%',
  },
});

const ItemText = styled.text(({ theme }) => ({
  ...theme.sqwTier2Typography.bodySm,
  textAnchor: 'middle',
  dominantBaseline: 'middle',
}));

export const S = {
  ItemPath,
  ItemMedia,
  ItemText,
};
