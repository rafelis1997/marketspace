import { ReactNode } from 'react';
import { Button as NativeButton, Text, IButtonProps, HStack, Center, useTheme, Spinner } from "native-base";
import { IconContext } from "phosphor-react-native";

type ButtonProps = IButtonProps & {
  title: string;
  variant?: "black" | "gray" | "blue";
  children?: ReactNode | ReactNode[];
  isLoading?: boolean;
}

export function Button({ children, variant = "gray", title, isLoading = false, ...rest }: ButtonProps) {
  const { colors } = useTheme();
  return (
    <NativeButton
      w="full"
      h={12}
      flex={1}
      bg={variant === "gray" ? "gray.300" : variant === "black" ? "gray.700" : "blue.500"}
      rounded="lg"
      _pressed={{
        bg: variant === "gray" ? "gray.300" : variant === "black" ? "gray.700" : "blue.500",
        opacity: 0.9,
      }}
      flexDirection="row"
      {...rest}
    > 
      <Center flexDirection="row">
        {!isLoading ? (
          <>
            <IconContext.Provider
              value={{
                color: variant === "gray" ? colors.gray[600] : colors.gray[100],
                size: 16,
              }}
            >
              {children}
            </IconContext.Provider>
            <Text
              color={variant === "gray" ? "gray.600" : "gray.100"}
              fontWeight="bold"
              ml={2}
            >
              {title}
            </Text>
          </>
        ) : (
          <Spinner color={variant === "gray" ? "gray.600" : "gray.100"}/>
        )}
      </Center>
    </NativeButton>
  );
}