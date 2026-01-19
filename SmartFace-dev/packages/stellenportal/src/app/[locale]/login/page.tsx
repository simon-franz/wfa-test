import { Login } from '../../../components/Login';
import RootLayout from '../../../components/RootLayout';

const LoginPage = async () => {
  return (
    <RootLayout hideFooter paddingTop={0}>
      <Login />
    </RootLayout>
  );
};

export default LoginPage;
