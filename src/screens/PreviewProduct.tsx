import { Heading, HStack, ScrollView, Text, useTheme, useToast, VStack } from "native-base";
import { Tag as TagIcon, ArrowLeft } from "phosphor-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Avatar } from "@components/Avatar";
import { Carrousel } from "@components/Carroussel";
import { Tag } from "@components/Tag";
import { Button } from "@components/Button";

import defaultUserAvatar from '@assets/userPhotoDefault.png'
import { PaymentMethodText, PaymentMethodTextProps } from "@components/PaymentMethodText";
import { ProductDTO } from "@dtos/ProductDTO";
import { PhotoType } from "./CreateProduct";
import { useEffect, useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { HomeTabNavigatorRoutesProps } from "@routes/app.routes";

type RouteParams = {
  product: ProductDTO;
  photos: Array<PhotoType>;
}

const PAYMENT_METHODS = "boleto" || "pix" || "cash" || "card" || "deposit" as const;

export function PreviewProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigation<HomeTabNavigatorRoutesProps>();

  const route = useRoute();
  const { photos, product } = route?.params as RouteParams; 

  const { user } = useAuth();
  const toast = useToast();

  const data = [...new Array(3).keys()];

  function handleGoBack() {
    navigator.goBack();
  }

  async function handlePublishProduct() {
    try {
      setIsLoading(true);

      const {data} = await api.post('/products/', {
        name: product.title,
        description: product.description,
        is_new: product.isNew === "new" ? true : false,
        price: product.price * 100,
        accept_trade: product.accept_trade,
        payment_methods: product.payment_methods,
      })

      if (data?.id) {
        const photosForm = new FormData();
        
        photos.forEach((photo) => {
          photosForm.append('images', photo as any);
        })

        photosForm.append('product_id', data.id);

        await api.post('/products/images/', photosForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
      }
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'
      
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false);
      navigator.navigate("home");
    }
  }

  return (
    <>
      <VStack justifyContent="flex-start" alignItems="center" px={4} pt={10} pb={6} bg="blue.500">
       <Heading fontSize="md" color="gray.100">Pré visualização do anúncio</Heading>
       <Text fontSize="sm" color="gray.100">É assim que seu produto vai aparecer!</Text>
      </VStack>

      <ScrollView flex={1} showsVerticalScrollIndicator={false} bg="gray.200" contentContainerStyle={{paddingBottom: 32}}>
        
        <Carrousel data={photos} />

        <VStack flex={1} mt={5} px={6}>
          <HStack alignItems="center" mb={8}>
            <Avatar avatarPath={user.avatar} size={8} alt="avatar" mr={2}/>
            <Text color="gray.700" fontSize="md">{user.name}</Text>
          </HStack>

          <VStack mb={8}>
            <HStack>
              <Tag isChecked={false} title="NOVO" justifyContent="center"/>
            </HStack>

            <HStack alignItems="center" justifyContent="space-between" mt={3} mb={3}>
              <Heading>{product.title}</Heading>
              <Text color="blue.500" fontWeight="bold">
                R$ 
                <Heading color="blue.500">{product.price}</Heading>
              </Text>
            </HStack>

            <Text color="gray.500">
              {product.description}
            </Text>
          </VStack>

          <VStack>
            <HStack mb={4}>
              <Text color="gray.500" fontWeight="bold">Aceita troca?</Text>
              <Text color="gray.500" ml={2}>
                {product.accept_trade ? "Sim" : "Não"}
              </Text>
            </HStack>

            <VStack>
              <Text color="gray.500" fontWeight="bold" mb={3}>Meios de pagamento:</Text>
              {product.payment_methods.map(paymentMethod => (
                <PaymentMethodText key={paymentMethod} method={paymentMethod as typeof PAYMENT_METHODS}/>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>

      <HStack px={6} safeAreaBottom py={6} bg="gray.100">
        <Button title="Voltar e editar" mr={3}>
          <ArrowLeft size={16}/>
        </Button>
        <Button title="Publicar" variant="blue" isLoading={isLoading} onPress={handlePublishProduct}>
          <TagIcon size={16}/>
        </Button>
      </HStack>
    </>
  );
}



