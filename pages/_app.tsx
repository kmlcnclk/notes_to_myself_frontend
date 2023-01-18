import '@/styles/tailwind.css';
import type { AppProps } from 'next/app';
import 'antd/dist/reset.css';
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../src/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
