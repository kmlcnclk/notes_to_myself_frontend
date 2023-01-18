import React from 'react';
import { Caveat } from '@next/font/google';

const caveat = Caveat({
  weight: '700',
});

function Header() {
  return (
    <header className="p-4 shadow-lg">
      <div className="w-full text-center">
        <h1
          className={`text-center max-md:mt-2 max-md:text-md md:text-2xl ${caveat.className} mb-0`}
        >
          Notes to Myself
        </h1>
      </div>
    </header>
  );
}

export default Header;
