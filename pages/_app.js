import "@/styles/globals.css";
import Layout from '@/components/Layout';
import NextProgress from "nextjs-progressbar";
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Layout>
      <NextProgress
            color="#405189"
            startPosition={0.3}
            stopDelayMs={200}
            height={5}
            showOnShallow={true}
          />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
