import { Box, Heading, HStack, Image, Pressable, Text, IPressableProps, VStack } from "native-base";

import { Avatar } from "./Avatar";

import productImage from '@assets/productImage.png';
import defaultUserAvatar from '@assets/userPhotoDefault.png'

type Props = IPressableProps & {
  itemWidth: number;
}

export function ProductCard({itemWidth, ...rest}: Props) {
  return (
    <Pressable flex={1} width="full" maxW={itemWidth} {...rest}>
      <Avatar 
        borderColor="gray.100"
        borderWidth={1}
        source={defaultUserAvatar}
        size={6}
        position="absolute"
        top={1}
        left={1}
        zIndex={2}
        alt="avatar"
      />

      <Box
        rounded="full"
        position="absolute"
        top={1}
        right={1}
        zIndex={2}
        justifyContent="center"
        alignItems="center"
        px={2}
        bg="blue.700"
      >
        <Text color="gray.100" fontWeight="bold" fontSize={12}>Novo</Text>
      </Box>

      <Image 
        rounded="lg"
        source={productImage}
        defaultSource={productImage}
        alt="Produto"
        resizeMode="cover"
        width="full"
        height={itemWidth * 0.5625}
      />

      <Text color="gray.600">Tênis vermelho</Text>
      <HStack alignItems="flex-end">
        <Heading color="gray.700" fontSize="sm" mr={1}>R$</Heading>
        <Heading color="gray.700" fontSize="lg" lineHeight="xs">59,90</Heading>
      </HStack>
    </Pressable>
  );
}