import { Box, IBoxProps, Image, IPressableProps, Pressable, useTheme } from "native-base";
import { Plus, X } from "phosphor-react-native";

import productDefault from '../assets/productImage.png'

type Props = IPressableProps & {
  hasPhoto?: boolean;
  imgPath?: string; 
}

export function PhotoBox({ hasPhoto, imgPath, ...rest }: Props) {
  const { colors } = useTheme();

  return (
    <>
    {hasPhoto ?
      <Pressable width={108} height={108} rounded={2} position="relative" {...rest}>
        <Image 
          rounded="lg"
          source={{uri: imgPath}}
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
      </Pressable>
    : 
      <Pressable
        width={108}
        height={108}
        bg="gray.300"
        justifyContent="center"
        alignItems="center"
        rounded="lg"
        {...rest}
      >
        <Plus size={24} color={colors.gray['400']}/>
      </Pressable>
    }
    </>
  );
}