import { useState } from 'react';
import { Input as NativeBaseInput, IInputProps, FormControl, Pressable, useTheme } from 'native-base';
import { Eye, EyeSlash, IconContext } from 'phosphor-react-native'


type Props = IInputProps & {
  errorMessage?: string | null;
}
export function PasswordInput({ errorMessage = null, isInvalid, ...rest }: Props) {
  const [show, setShow] = useState(true);

  const { colors } = useTheme();
  
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
        placeholder="Senha"
        fontFamily="body"
        placeholderTextColor="gray.400"
        autoCapitalize='none'
        isInvalid={invalid}
        secureTextEntry={show}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
        }}
        _focus={{
          bg: "gray.100",
          borderWidth: 1,
          borderColor: "gray.700",
        }}
        InputRightElement={
          <IconContext.Provider
            value={{
              color: colors.gray['400'],
              size: 20,
            }}
          >
            <Pressable onPress={() => setShow(!show)} mr={4}>
              {show ? (
                <Eye/>
              ): (
                <EyeSlash/>
              )}
            </Pressable>
          </IconContext.Provider>
        }

        {...rest}
      />
      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}