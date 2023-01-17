import React, { useEffect } from 'react';
import LoginComponent from '../components/auth/login.component';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
  }, [router]);

  return (
    <Layout>
      <LoginComponent {...{ router }} />
    </Layout>
  );
};

export default Login;
