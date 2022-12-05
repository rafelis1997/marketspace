import { useState } from 'react';
import { Input as NativeBaseInput, IInputProps, FormControl, Pressable, useTheme } from 'native-base';
import { IconContext, MagnifyingGlass, Sliders } from 'phosphor-react-native'


type Props = IInputProps & {
  openFilterModal: () => void;
}
export function SearchBar({ openFilterModal ,...rest }: Props) {
  const { colors } = useTheme();

  return (
      <NativeBaseInput 
        bg="gray.100"
        mb={4}
        h={14}
        px={4}        
        rounded="lg"
        color="gray.600"
        borderWidth={0}
        fontSize="md"
        placeholder="Buscar anúncio"
        fontFamily="body"
        placeholderTextColor="gray.400"
        _focus={{
          bg: "gray.100",
          borderWidth: 1,
          borderColor: "gray.700",
        }}
        InputRightElement={
          <IconContext.Provider
            value={{
              color: colors.gray['700'],
              size: 20,
              weight: "bold",
            }}
          >
            <Pressable pr={3} borderRightColor="gray.300" borderRightWidth={1}>
              <MagnifyingGlass />
            </Pressable>
            <Pressable mr={4} ml={3} onPress={openFilterModal}>
              <Sliders />
            </Pressable>
          </IconContext.Provider>
        }

        {...rest}
      />
  );
}