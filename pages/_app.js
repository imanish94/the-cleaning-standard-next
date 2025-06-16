import "@/styles/globals.css";
import Layout from '@/components/Layout';
import NextProgress from "nextjs-progressbar";
import { SessionProvider } from 'next-auth/react';
import { ServiceProvider } from '../context/ServiceContext';

export default function App({ Component, pageProps }) {
  return (
    <ServiceProvider>
      <SessionProvider>
        <Layout>
          <NextProgress
            color="#ffc702"
            startPosition={0.3}
            stopDelayMs={200}
            height={5}
            showOnShallow={true}
            options={{ showSpinner: true }}
          />
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ServiceProvider>
  );
}
