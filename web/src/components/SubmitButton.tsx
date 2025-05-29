import React from 'react';
import { Button, Box } from '@chakra-ui/react';

// Simple props interface to avoid complex type inference
interface SubmitButtonProps {
  isLoading?: boolean;
  colorScheme?: string;
  children: React.ReactNode;
}

// A simplified button component that wraps Chakra UI Button
export const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  const { isLoading, colorScheme = 'blue', children } = props;

  // Render a simple button with minimal props to avoid complex type inference
  return (
    <Box mt={4}>
      <Button type="submit" isLoading={isLoading || false} colorScheme={colorScheme}>
        {children}
      </Button>
    </Box>
  );
};
