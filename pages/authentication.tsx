import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

function Authentication() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/register');
    router.prefetch('/login');
  }, [router]);

  return (
    <Layout>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="space-x-7">
          <button
            className="bg-blue-500 shadow-xl rounded-xl p-3 text-white cursor-pointer"
            onClick={() => router.push('/register')}
          >
            Register
          </button>
          <button
            className="bg-blue-500 shadow-xl rounded-xl p-3 text-white cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Authentication;
