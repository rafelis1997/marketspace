import { Box, IBoxProps, Image, Pressable, useTheme } from "native-base";
import { Plus, X } from "phosphor-react-native";

import productDefault from '../assets/productImage.png'

type Props = IBoxProps & {
  hasPhoto?: boolean
}

export function PhotoBox({ hasPhoto, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <>
    {hasPhoto ?
      <Box width={108} height={108} rounded={2} position="relative" {...rest}>
        <Image 
          rounded="lg"
          source={productDefault}
          defaultSource={productDefault}
          alt="Produto"
          resizeMode="cover"
          width="full"
          height="full"
        />

        <Pressable
          w={5}
          h={5}
          rounded="full"
          bg="gray.700"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          top={2}
          right={2}
        >
          <X size={12} color={colors.gray['100']}/>
        </Pressable>
      </Box>
    : 
      <Box width={108} height={108} {...rest}>
        <Pressable
          w="full"
          h="full"
          bg="gray.300"
          justifyContent="center"
          alignItems="center"
          rounded="lg"
        >
          <Plus size={24} color={colors.gray['400']}/>
        </Pressable>
      </Box>
    }
    </>
  );
}