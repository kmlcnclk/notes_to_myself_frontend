import Head from 'next/head';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Notes to Myself</title>
        <link rel="icon" href="/logo.png" />
        <meta
          name="description"
          content="Take any note for yourself with Notes to Myself"
        />
        <meta charSet="utf-8" />
        <meta name="robots" content="follow, index" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta property="og:url" content="https://notestomyself.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Notes to Myself" />
        <meta
          property="og:description"
          content="Take any note for yourself with Notes to Myself"
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://notestomyself.vercel.app" />
        <meta name="twitter:title" content="Notes to Myself" />
        <meta
          name="twitter:description"
          content="Take any note for yourself with Notes to Myself"
        />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="next-head-count" content="3" />
      </Head>
      <>{children}</>
    </>
  );
};

export default Layout;
