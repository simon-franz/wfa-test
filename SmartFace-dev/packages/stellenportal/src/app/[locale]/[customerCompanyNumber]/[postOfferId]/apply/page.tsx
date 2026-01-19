import { getTranslations } from 'next-intl/server';

import { ApplicationForm } from '../../../../../components/ApplicationForm';
import { Breadcrumbs } from '../../../../../components/Breadcrumbs';
import type { Breadcrumb } from '../../../../../components/Breadcrumbs/Breadcrumbs.types';
import { Header } from '../../../../../components/Header';
import { Layout, LayoutMain } from '../../../../../components/Layout';
import { getSinglePostWithPostOffer } from '../../../../../data-access/getSinglePostWithPostOffer';
import type { PageWithParams } from '../../../../../types/shared';

const ApplyPage = async ({ params }: PageWithParams<'postOfferId' | 'customerCompanyNumber'>) => {
  const { postOfferId, customerCompanyNumber } = await params;
  const post = await getSinglePostWithPostOffer(postOfferId, customerCompanyNumber);
  const t = await getTranslations('Main');

  // TODO: Use SUI Breadcrumb Component in the future
  const breadcrumbs: Breadcrumb[] = [
    { label: t('home'), href: `/${customerCompanyNumber}` },
    { label: t('job-offer'), href: `/${customerCompanyNumber}/${postOfferId}` },
    { label: t('application-form') },
  ];

  return (
    <>
      <Header customerCompanyNumber={customerCompanyNumber} />
      <Layout>
        <LayoutMain>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          {post && <ApplicationForm postOfferId={postOfferId} post={post} />}
        </LayoutMain>
      </Layout>
    </>
  );
};

export default ApplyPage;
