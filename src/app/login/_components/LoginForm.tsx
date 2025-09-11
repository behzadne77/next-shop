"use client";

import { useState } from 'react';
import { useForm } from '@mantine/form';
import { resolver, LoginFormData } from "@/validation/login"
import {
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Stack,
  Alert,
  Center,
  Box
} from '@mantine/core';
import { AlertCircle, LogIn } from 'lucide-react';
import { useLoginMutation } from '@/queries/use-users';
import { LoginResponse } from '@/types/user';


export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
    validate: resolver,
  });

  const loginMutation = useLoginMutation();

  const handleSubmit = async (values: LoginFormData) => {
    setError(null);
    try {
      const data: LoginResponse = await loginMutation.mutateAsync(values);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <Container size={420} my={40}>
      <Center>
        <Box w="100%">
          <Title ta="center" fw={900} mb="xl">
            Login to your account
          </Title>
          
          <Paper withBorder shadow="md" p={30} radius="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                {error && (
                  <Alert
                    icon={<AlertCircle size={16} />}
                    title="Error"
                    color="red"
                    variant="light"
                  >
                    {error}
                  </Alert>
                )}

                <TextInput
                  label="Username"
                  placeholder="username"
                  {...form.getInputProps('username')}
                  leftSection={<LogIn size={16} />}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  {...form.getInputProps('password')}
                />

                <Button
                  type="submit"
                  fullWidth
                  loading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                  mt="md"
                >
                  {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Center>
    </Container>
  );
}


