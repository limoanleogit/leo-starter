import { cacheExchange } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange } from 'urql';

export const createUrqlClient = (ssrExchange: any) => {
  const isServer = typeof window === 'undefined';
  return {
    url: process.env.NEXT_PUBLIC_BACK_END_URL || 'http://localhost:4000/graphql',
    exchanges: [dedupExchange, cacheExchange({}), ssrExchange, fetchExchange],
    fetchOptions: () => {
      if (isServer) {
        return {};
      }

      let token: string | null = null;
      try {
        token = sessionStorage.getItem('token');
      } catch (error) {
        console.error('Error accessing sessionStorage:', error);
      }

      return {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          'Content-Type': 'application/json',
        },
        credentials: 'include' as const,
      };
    },
  };
};
