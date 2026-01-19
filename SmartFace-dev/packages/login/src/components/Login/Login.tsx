'use client';

import Button from '@hrworks/sui-core/Button';
import Grid from '@hrworks/sui-core/Grid';
import GridItem from '@hrworks/sui-core/GridItem';
import PasswordField from '@hrworks/sui-core/PasswordField';
import { useActionState } from 'react';

import { loginAction } from '../../data-access/auth-actions';
import { S } from './Login.styles';
// TODO: Remove after Secondaries Utils Package is implemented
export const Login = () => {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <S.SplitView>
      <S.LeftSide>
        <S.ContentContainer action={formAction}>
          <S.Logo src="https://d3nnb1hxumbr0v.cloudfront.net/images/logos2024Relaunch/HRW_Logo_ohne_Claim_Farbe_360x65px.png" />
          <Grid gap={{ xs: 'large', lg: 'extraLarge' }}>
            <GridItem>
              <S.Title alignTitle="center">Login Login</S.Title>
            </GridItem>
            <GridItem>
              <Grid>
                <GridItem>
                  <PasswordField
                    autoFocus
                    name="passwort"
                    label="Passwort"
                    helpText={state.error}
                    validationMessage={state.error}
                    validationState={state.error ? 'danger' : undefined}
                    disabled={pending}
                  />
                </GridItem>
                <GridItem>
                  <Button type="submit" fullWidth textAlign="center" size="large" disabled={pending}>
                    {pending ? 'Wird geprüft...' : 'Weiter'}
                  </Button>
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </S.ContentContainer>
      </S.LeftSide>
      <S.RightSide>
        <S.RightTitle>#MitSmartFaceWirdAllesBesser</S.RightTitle>
      </S.RightSide>
    </S.SplitView>
  );
};
