import { useEffect, useState } from "react";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { Box, Center, HStack, Text, useTheme, useToast, VStack } from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { HomeTabNavigatorRoutesProps } from "@routes/app.routes";

export function MyProductsBanner() {
  const [myProducts, setMyProducts] = useState([]);

  const navigator = useNavigation<HomeTabNavigatorRoutesProps>();

  const { colors } = useTheme();

  const toast = useToast();

  async function fetchProducts() {
    try {
      const { data } = await api.get('/users/products');
  
      setMyProducts(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível contar os anúncios, tente mais tarde'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  function handleGoToMyProducts() {
    navigator.navigate('myProducts');
  }

  useEffect(() => {
    fetchProducts();
  }, [])
  return (
        <Box
          rounded="lg"
          bg="rgba(100, 122, 199, 0.1)"
          width="full"
          py={4}
          pr={5}
          pl={4}
          mt={3}
        >
          <Center flexDirection="row" justifyContent="space-between">
            <HStack alignItems="center">
              <Tag size={22} color={colors.blue[700]}/>

              <VStack ml={4}>
                <Text fontFamily="heading" fontSize="lg" lineHeight="sm">{myProducts.length}</Text>
                <Text fontFamily="body">anúncios ativos</Text>
              </VStack>
            </HStack>

            <TouchableOpacity onPress={handleGoToMyProducts}>
              <Center flexDirection="row">
                <Text color="blue.700" fontWeight="bold" mr={2} lineHeight="sm">Meus anúncios</Text>
                <ArrowRight color={colors.blue[700]} size={16} weight="bold"/>
              </Center>
            </TouchableOpacity>
          </Center>
        </Box>
  );
}