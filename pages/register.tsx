import React, { useEffect } from 'react';
import RegisterComponent from '../components/auth/register.component';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

function Register() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
  }, [router]);

  return (
    <Layout>
      <RegisterComponent {...{ router }} />
    </Layout>
  );
}

export default Register;
