import App from '../../components/App';
import { getSettings } from '../../data-access/getSettings';
import { getUsers } from '../../data-access/getUsers';

const Page = async () => {
  const users = await getUsers();
  const { isCameraContinuous, isTimeTypeSelectionEnabled, isProjectBookingEnabled } = await getSettings();

  return (
    <App
      users={users}
      isCameraContinuous={isCameraContinuous}
      isTimeTypeSelectionEnabled={isTimeTypeSelectionEnabled}
      isProjectBookingEnabled={isProjectBookingEnabled}
    />
  );
};
export default Page;
