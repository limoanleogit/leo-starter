import { cacheExchange } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange, SSRExchange } from 'urql';

export const createUrqlClient = (ssrExchange: SSRExchange) => ({
  url: process.env.NEXT_PUBLIC_BACK_END_URL || 'http://localhost:4000/graphql',
  exchanges: [dedupExchange, cacheExchange({}), ssrExchange, fetchExchange],
  fetchOptions: {
    credentials: 'include',
  },
});
