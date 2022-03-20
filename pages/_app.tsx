import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Context from '../context/Context';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Context>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context>
  );
}

export default MyApp;
