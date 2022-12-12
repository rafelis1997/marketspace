import { IPressableProps, Pressable, Text, useTheme, ITextProps } from "native-base";
import { X, XCircle } from "phosphor-react-native";

type Props = IPressableProps & ITextProps & {
  isChecked?: boolean;
  title: string;
}

export function Tag({isChecked, title, bg, color, ...rest}: Props) {

  const { colors } = useTheme();

  return (
    <Pressable 
      {...rest} 
      px={4} 
      pr={2}
      py={2} 
      justifyContent="space-between" 
      alignItems="center"
      bg={isChecked ? isChecked === true ? "blue.500" : "gray.300" : bg}
      flexDirection="row"
      rounded="full"
      color={isChecked ? isChecked === true ? "gray.100" : "gray.500" : color}
    >
      <Text fontWeight="bold" fontSize="xs" pr={2} color={color}>{title}</Text>
      {isChecked && (
        <XCircle size={16} weight="fill" color={colors.gray[200]}/>
      )}
    </Pressable>
  );
}