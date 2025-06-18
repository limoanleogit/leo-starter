import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Heading,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { InputField } from '../components/InputField';
import { useState } from 'react';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login() {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState('');
  return (
    <Layout>
      <Box>
        <Heading as="h2" size="lg" mb={6}>
          Login
        </Heading>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            const result = await login({ input: values });
            const connection = result.data?.login?.token;
            if (result.error) {
              setErr(true);
              setMsg(result.error?.message || 'An error occurred');
            } else if (connection === null) {
              setErr(true);
              setMsg('Username not found or password is wrong');
            } else {
              sessionStorage.setItem('token', connection || '');
              sessionStorage.setItem('userId', result.data?.login?.userId || '');
              setSuccess(true);
              router.push(`/user/${result.data?.login?.userId}`);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {success ? (
                <Alert status="success">
                  <AlertIcon />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>User logged in successfully</AlertDescription>
                </Alert>
              ) : err ? (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{msg}</AlertDescription>
                </Alert>
              ) : null}
              <Box mt={4}>
                <InputField name="username" placeholder="username" label="Username" />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button mt={4} colorScheme="blue" isLoading={isSubmitting} type="submit">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
}
