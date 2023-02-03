import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

function Auth() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/register');
    router.prefetch('/login');
  }, [router]);

  return (
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
  );
}

export default Auth;
