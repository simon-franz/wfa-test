import { Header } from '../../../../../../components/Header';
import { StatusPage } from '../../../../../../components/StatusPage';
import { getSettings } from '../../../../../../data-access';
import type { PageWithParams } from '../../../../../../types/shared';

const Success = async ({ params }: PageWithParams<'postOfferId' | 'customerCompanyNumber'>) => {
  const { postOfferId, customerCompanyNumber } = await params;
  const { applicationSuccessfullySubmittedContent } = await getSettings(customerCompanyNumber);

  return (
    <>
      <Header customerCompanyNumber={customerCompanyNumber} />
      {/* TODO: Consider using StatusPage from SUI - maybe needs a refactor to allow for children */}
      <StatusPage
        title={applicationSuccessfullySubmittedContent?.title}
        subtitle={applicationSuccessfullySubmittedContent?.text as string}
        redirectButton={{ href: `/${customerCompanyNumber}/${postOfferId}`, title: 'Zurück zur Stellenanzeige' }}
      />
    </>
  );
};

export default Success;
