import { getTranslations } from 'next-intl/server';

import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import type { Breadcrumb } from '../../../../components/Breadcrumbs/Breadcrumbs.types';
import { CompanyMedia } from '../../../../components/CompanyMedia';
import { Header } from '../../../../components/Header';
import { Hero } from '../../../../components/Hero';
import { Layout, LayoutMain, LayoutSidebar } from '../../../../components/Layout';
import { PostDescriptions } from '../../../../components/PostDescriptions';
import { Sidebar } from '../../../../components/Sidebar';
import { getSettings, getSinglePostWithPostOffer } from '../../../../data-access';
import type { PageWithParams } from '../../../../types/shared';

const JobPage = async ({ params }: PageWithParams<'postOfferId' | 'customerCompanyNumber'>) => {
  const t = await getTranslations('Main');
  const { postOfferId, customerCompanyNumber } = await params;
  const [post, settings] = await Promise.all([
    getSinglePostWithPostOffer(postOfferId, customerCompanyNumber),
    getSettings(customerCompanyNumber),
  ]);

  // TODO: Consider using SUI Breadcrumbs
  const breadcrumbs: Breadcrumb[] = [{ label: 'Home', href: `/${customerCompanyNumber}` }, { label: t('job-offer') }];

  // const imageSrc = post?.postCoverPicture || settings.infoContent?.picture?.url; // TODO: Pretty sure postCoverPicture exists
  const imageSrc = settings.infoContent?.picture?.url; // TODO: Pretty sure postCoverPicture exists

  return (
    <>
      <Header secondRow customerCompanyNumber={customerCompanyNumber} post={post} />
      <Layout>
        <LayoutMain>
          <Hero imageSrc={imageSrc}>{post?.postOffer.displayName}</Hero>
        </LayoutMain>
      </Layout>
      <Layout>
        <LayoutMain>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          {post && <PostDescriptions postDescriptions={post.postDescriptions} />}
        </LayoutMain>
        <LayoutSidebar>{post && <Sidebar post={post} settings={settings} />}</LayoutSidebar>
      </Layout>
      <Layout>
        <LayoutMain>
          <CompanyMedia settings={settings} />
        </LayoutMain>
      </Layout>
    </>
  );
};

export default JobPage;
