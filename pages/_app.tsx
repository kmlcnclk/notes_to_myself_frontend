import '@/styles/tailwind.css';
import type { AppProps } from 'next/app';
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
