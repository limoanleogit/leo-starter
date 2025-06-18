import { NextPage } from 'next';
import { Formik, Form } from 'formik';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Heading,
} from '@chakra-ui/react';
import { InputField } from '../components/InputField';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { useRegisterMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import Layout from '../components/Layout';
import { useState } from 'react';

const RegisterSchema = Yup.object().shape({
  firstname: Yup.string().required('Firstname is required'),
  lastname: Yup.string().required('Lastname is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string().required('Password is required'),
});

const Register: NextPage = () => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState('');
  return (
    <Layout>
      <Box>
        <Heading as="h2" size="lg" mb={6}>
          Register
        </Heading>
        <Formik
          initialValues={{ firstname: '', lastname: '', username: '', email: '', password: '' }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setErrors }) => {
            try {
              const response = await register({ input: values });
              if (response.error) {
                setErrors({
                  username: response.error.message,
                });
                setErr(true);
                setMsg(response.error.message);
                return;
              } else {
                setSuccess(true);
                router.push('/login');
              }
            } catch (error) {
              throw new Error("Une erreur s'est produite lors de l'enregistrement");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {success ? (
                <Alert status="success">
                  <AlertIcon />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>User registered successfully</AlertDescription>
                </Alert>
              ) : err ? (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>{msg}</AlertDescription>
                </Alert>
              ) : null}
              <Box mt={4}>
                <InputField name="firstname" placeholder="firstname" label="Firstname" />
              </Box>
              <Box mt={4}>
                <InputField name="lastname" placeholder="lastname" label="Lastname" />
              </Box>
              <Box mt={4}>
                <InputField name="username" placeholder="username" label="Username" />
              </Box>
              <Box mt={4}>
                <InputField name="email" placeholder="email" label="Email" type="email" />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
              <Button type="submit" mt={4} isLoading={isSubmitting} colorScheme="blue">
                register
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Register);
