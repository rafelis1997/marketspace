import { Box, Heading, HStack, Image, Pressable, Text, IPressableProps, VStack } from "native-base";

import { Avatar } from "./Avatar";

import productImage from '@assets/productImage.png';
import defaultUserAvatar from '@assets/userPhotoDefault.png'
import { api } from "@services/api";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export type ProductType = {
  id: string;
  user: {
    avatar: string;
  }
  price: number;
  name: string;
  product_images: {
    path: string;
  }[];
  is_new: boolean;
}

type Props = IPressableProps & {
  itemWidth: number;
  product: ProductType;
  isOwner?: boolean;
}

export function ProductCard({itemWidth, product, isOwner=false, ...rest}: Props) {
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleGoToProduct() {
    navigator.navigate('product', { productId: product.id, isOwner: isOwner });
  }

  return (
    <Pressable flex={1} width="full" maxW={itemWidth} onPress={handleGoToProduct} {...rest}>
      <Avatar
        borderColor="gray.100"
        borderWidth={1}
        avatarPath={product.user.avatar}
        fallbackSource={defaultUserAvatar}
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
        bg={product.is_new ? "blue.700" : "gray.300" }
      >
        <Text color="gray.100" fontWeight="bold" fontSize={12}>
          {product.is_new ? "NOVO" : "USADO"}
        </Text>
      </Box>

      <Image 
        rounded="lg"
        source={{uri: `${api.defaults.baseURL}/images/${product.product_images[0].path}`}}
        defaultSource={productImage}
        alt="Produto"
        resizeMode="cover"
        width="full"
        height={itemWidth * 0.5625}
      />

      <Text color="gray.600">{product.name}</Text>
      <HStack alignItems="flex-end">
        <Heading color="gray.700" fontSize="sm" mr={1}>R$</Heading>
        <Heading color="gray.700" fontSize="lg" lineHeight="xs">{product.price/100}</Heading>
      </HStack>
    </Pressable>
  );
}