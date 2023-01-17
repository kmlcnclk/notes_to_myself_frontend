import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function Auth() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/register');
    router.prefetch('/login');
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="space-x-7">
        <Button
          type="primary"
          className="bg-blue-500 shadow-lg"
          size="large"
          onClick={() => router.push('/register')}
        >
          Register
        </Button>
        <Button
          type="primary"
          className="bg-blue-500 shadow-lg"
          size="large"
          onClick={() => router.push('/login')}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Auth;
