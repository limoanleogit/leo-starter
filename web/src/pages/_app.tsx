import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider, createClient } from 'urql';

const client = createClient({
  url: process.env.NEXT_PUBLIC_BACK_END_URL || 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
