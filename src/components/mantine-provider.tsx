"use client";
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    brand: [
      '#e3f2fd',
      '#bbdefb', 
      '#90caf9',
      '#64b5f6',
      '#42a5f5',
      '#2196f3',
      '#1e88e5',
      '#1976d2',
      '#1565c0',
      '#0d47a1'
    ]
  },
  fontFamily: 'var(--font-roboto), sans-serif',
  headings: {
    fontFamily: 'var(--font-roboto), sans-serif',
  },
});

export function MantineProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider theme={theme}>
      {children}
      <Notifications />
    </MantineProvider>
  );
}

