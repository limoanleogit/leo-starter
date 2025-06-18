import { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { useGetUsernameQuery } from '../../generated/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { Box, Button, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import { useEffect } from 'react';

const User: NextPage = () => {
  const router = useRouter();
  const userId = sessionStorage.getItem('userId') || '';
  const [{ data, error, fetching }] = useGetUsernameQuery({
    variables: {
      userId: userId,
    },
  });

  useEffect(() => {
    if (error || !data?.getUsername) {
      <Box>
        <Flex alignItems="center" h="100vh" justifyContent="center">
          {error ? 'An error occurred when fetching user' : 'User not found or not authenticated'}
        </Flex>
      </Box>;
      // logout();
    }
  }, [error, router]);

  const logout = () => {
    sessionStorage.removeItem('token');
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  };

  if (fetching) return <Box>Loading...</Box>;

  return (
    <Layout>
      <Box>
        <Flex alignItems="center" h="50vh" justifyContent="center" fontWeight="bold" fontSize="5xl">
          Welcome {data?.getUsername?.firstname} {data?.getUsername?.lastname}
        </Flex>
        <Wrap>
          <WrapItem>
            <Button colorScheme="blue" onClick={() => router.push('play')}>
              Play
            </Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme="red" onClick={logout}>
              Logout
            </Button>
          </WrapItem>
        </Wrap>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(User);
