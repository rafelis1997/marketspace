import { Heading, HStack, Pressable, ScrollView, Text, useTheme, useToast, VStack } from "native-base";
import { ArrowLeft, Pencil, PencilSimpleLine, Power, Trash, WhatsappLogo } from "phosphor-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Avatar } from "@components/Avatar";
import { Carrousel } from "@components/Carroussel";
import { Tag } from "@components/Tag";
import { Button } from "@components/Button";

import defaultUserAvatar from '@assets/userPhotoDefault.png'
import { PaymentMethodText } from "@components/PaymentMethodText";
import { useEffect, useState } from "react";
import { ProductDTO } from "@dtos/ProductDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type RouteParams = {
  isOwner?: boolean;
  productId: string;
}

type ProductType = {
  id: string;
  user: {
    avatar: string;
    name: string;
  }
  price: number;
  name: string;
  description: string;
  accept_trade: boolean;
  product_images: {
    path: string;
  }[];
  is_new: boolean;
  payment_methods: {
    key: string;
  }[];
}


const PAYMENT_METHODS = "boleto" || "pix" || "cash" || "card" || "deposit" as const;

export function Product() {
  const [product, setProduct] = useState<ProductType>();
  const [isLoading, setIsLoading] = useState(false);


  const { colors } = useTheme();
  const navigator = useNavigation();
  const toast = useToast();

  const data = [...new Array(3).keys()];

  const route = useRoute();

  const { isOwner, productId } = route.params as RouteParams;

  function handleGoBack() {
    navigator.goBack();
  }

  async function fetchProduct() {
    try {
      setIsLoading(true);

      const { data } = await api.get(`/products/${productId}`);
      
      setProduct(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível recuperar os dados do produto";

      toast.show({
        title,
        placement: 'top',
        bg: 'red.500',
      })

      navigator.goBack();

    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [])

  return (
    <>
    {product && (
      <ScrollView flex={1} showsVerticalScrollIndicator={false} bg="gray.200" contentContainerStyle={{paddingBottom: 32}}>
        <HStack justifyContent={isOwner ? "space-between" : "flex-start"} alignItems="center" px={4} pt={4} pb={2}>
          <Pressable 
            width={12} 
            height={12}
            justifyContent="center"
            alignItems="center"
            _pressed={{
              opacity: 0.5,
              background: "gray.300",
              borderRadius: 6,
            }}
            onPress={handleGoBack}
          >
            <ArrowLeft size={24}  color={colors.gray[700]}/>
          </Pressable>
          {isOwner && (
            <Pressable 
              width={12} 
              height={12}
              justifyContent="center"
              alignItems="center"
              _pressed={{
                opacity: 0.5,
                background: "gray.300",
                borderRadius: 6,
              }}
              onPress={handleGoBack}
            >
              <PencilSimpleLine size={24}  color={colors.gray[700]}/>
            </Pressable>
          )}
        </HStack>
        
        <Carrousel data={product.product_images} />

        <VStack flex={1} mt={5} px={6}>
          <HStack alignItems="center" mb={8}>
            <Avatar avatarPath={product.user.avatar} size={8} alt="avatar" mr={2}/>
            <Text color="gray.700" fontSize="md">{product.user.name}</Text>
          </HStack>

          <VStack mb={8}>
            <HStack>
              <Tag 
                title={product.is_new ? "NOVO" : "USADO"}
                bg={product.is_new ? "blue.500" : "gray.300"}
                color={product.is_new ? "gray.100" : "gray.300"}
              />
            </HStack>

            <HStack alignItems="center" justifyContent="space-between" mt={3} mb={3}>
              <Heading>{product.name}</Heading>
              <Text color="blue.500" fontWeight="bold">
                R$ 
                <Heading color="blue.500">{product.price/100}</Heading>
              </Text>
            </HStack>

            <Text color="gray.500">
              {product.description}
            </Text>
          </VStack>

          <VStack>
            <HStack mb={4}>
              <Text color="gray.500" fontWeight="bold">Aceita troca?</Text>
              <Text color="gray.500" ml={2}>{product.accept_trade ? "Sim" : "Não"}</Text>
            </HStack>

            <VStack>
              <Text color="gray.500" fontWeight="bold" mb={3}>Meios de pagamento:</Text>
              {product.payment_methods.map(paymentMethod => (
                <PaymentMethodText key={paymentMethod.key} method={paymentMethod.key as typeof PAYMENT_METHODS}/>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    )}

      {isOwner ? 
        <VStack 
          background="gray.100" 
          pt={4}
          pb={5}
          px={6}
          height="100%"
          maxH={140}
        >
          <Button title="Desativar anúncio" mb={2} variant="black">
            <Power size={16}/>
          </Button>
          <Button title="Excluir anúncio">
            <Trash size={16}/>
          </Button>
        </VStack>

      : (
        <HStack 
          justifyContent="space-between" 
          alignItems="center"
          background="gray.100" 
          safeAreaBottom
          pt={4}
          pb={5}
          px={6}
        >
          <Text color="blue.700" fontWeight="bold" mb={0}>
            R$ 
            <Heading fontFamily="heading" color="blue.700" lineHeight="3rem">{product && product.price/100}</Heading>
          </Text>
          <Button title="Entrar em contato" variant="blue" maxWidth="50%">
            <WhatsappLogo weight="fill"/>
          </Button>
        </HStack>

      )}
    </>
  );
}
