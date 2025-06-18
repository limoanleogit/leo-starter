import { Box, Container, Heading, Link } from '@chakra-ui/react';
import { ReactNode } from 'react';
import NextLink from 'next/link';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Container maxW="container.sm" py={8}>
      <Heading as="h1" mb={6}>
        User Auth App
      </Heading>
      <Box mb={4}>
        <Link as={NextLink} href="/register" mr={6}>
          Register
        </Link>
        <Link as={NextLink} href="/login">
          Login
        </Link>
      </Box>
      {children}
    </Container>
  );
}
