import { IPressableProps, Pressable, Text, useTheme, ITextProps } from "native-base";
import { X, XCircle } from "phosphor-react-native";

type Props = IPressableProps & ITextProps & {
  isChecked: boolean;
  title: string;
}

export function Tag({isChecked, title, ...rest}: Props) {

  const { colors } = useTheme();

  return (
    <Pressable 
      {...rest} 
      px={4} 
      pr={2}
      py={2} 
      justifyContent="space-between" 
      alignItems="center"
      bg={isChecked ? "blue.500" : "gray.300"}
      flexDirection="row"
      rounded="full"
    >
      <Text fontWeight="bold" color={isChecked ? "gray.100" : "gray.500"} fontSize="sm" pr={2} {...rest}>{title}</Text>
      {isChecked && (
        <XCircle size={16} weight="fill" color={colors.gray[200]}/>
      )}
    </Pressable>
  );
}