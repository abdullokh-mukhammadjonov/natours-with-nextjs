import Layout from 'components/layout';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Ideal next mongoose</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
