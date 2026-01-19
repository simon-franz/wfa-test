import { Card, CardBody, CardHeader } from '../../../components/Card';
import { Header } from '../../../components/Header';
import { Hero } from '../../../components/Hero';
import { HTML } from '../../../components/Html';
import { JobPost } from '../../../components/JobPost';
import { Layout } from '../../../components/Layout';
import { LayoutMain } from '../../../components/Layout/LayoutMain';
import { Search } from '../../../components/Search';
import { Title } from '../../../components/Title';
import { filterPosts, getPosts, getSearchOptions, getSettings } from '../../../data-access';
import type { HomeProps } from './page.types';

export async function generateStaticParams() {
  return ['110192'].map((customerCompanyNumber) => ({ customerCompanyNumber }));
}

const Home = async ({ searchParams, params }: HomeProps) => {
  const { customerCompanyNumber } = await params;
  const _searchParams = await searchParams;

  const [posts, settings] = await Promise.all([getPosts(customerCompanyNumber), getSettings(customerCompanyNumber)]);

  if (!settings) {
    return <div>Error - No Settings found</div>;
  }

  const [filteredPosts, searchOptions] = await Promise.all([
    filterPosts(posts, _searchParams),
    getSearchOptions(posts),
  ]);

  return (
    <>
      <Header customerCompanyNumber={customerCompanyNumber} />
      <Layout>
        <LayoutMain>
          <Hero imageSrc={settings.infoContent?.picture?.url} />
          <Card>
            <CardHeader>
              <Title uppercase>{settings.infoContent?.title}</Title>
              <Title>{settings.infoContent?.subtitle}</Title>
            </CardHeader>
            <CardBody>
              <HTML html={settings.infoContent?.text + ''} />
            </CardBody>
          </Card>
          {searchOptions && <Search searchOptions={searchOptions} />}
          {filteredPosts?.map((post) =>
            post.postOffers?.map((postOffer) => (
              <JobPost
                customerCompanyNumber={customerCompanyNumber}
                post={post}
                postOffer={postOffer}
                key={postOffer.id}
              />
            )),
          )}
        </LayoutMain>
      </Layout>
    </>
  );
};

export default Home;
