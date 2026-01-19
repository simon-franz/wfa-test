import { Header } from '../../components/Header';
import { StatusPage } from '../../components/StatusPage';

// TODO: Consider using Status from SUI
const NotFound = () => (
  <>
    <Header />
    <StatusPage
      title="Die Zeitkiosk-Seite konnte nicht gefunden werden"
      subtitle="Die von Ihnen aufgerufene Zeitkiosk-Seite ist nicht mehr verfügbar oder der Link ist ungültig. Bitte überprüfen Sie die URL."
    />
  </>
);

export default NotFound;
