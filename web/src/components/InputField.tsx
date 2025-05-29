import { FC, InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { FormErrorMessage, FormControl, FormLabel, Input } from '@chakra-ui/react';

// Omit the HTML size attribute to avoid conflicts with Chakra UI
type IInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder?: string;
  name: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const InputField: FC<IInputFieldProps> = ({ label, size: _, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} placeholder={props.placeholder} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
