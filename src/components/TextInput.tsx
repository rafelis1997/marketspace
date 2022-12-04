import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null;
}
export function TextInput({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput 
        bg="gray.100"
        h={14}
        px={4}
        rounded="lg"
        color="gray.600"
        borderWidth={0}
        fontSize="md"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        _focus={{
          bg: "gray.100",
          borderWidth: 1,
          borderColor: "gray.700",
        }}

        {...rest}
      />

      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}