import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Box, FlatList, Heading, HStack, Pressable, Select, Text, useTheme, useToast, View, VStack, Center } from "native-base";
import { CaretDown, CaretUp, Plus } from "phosphor-react-native";

import { ProductCard, ProductType } from "@components/ProductCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";
import { useAuth } from "@hooks/useAuth";
import { ProductDTO } from "@dtos/ProductDTO";


const window = Dimensions.get("window");

export function MyProducts() {
  const [selected, setSelected] = useState("all");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [ isLoadingProducts, setIsLoadingProducts] = useState(false)
  const [dimensions, setDimensions] = useState(window);

  const { colors, fonts } = useTheme();
  const { width } = dimensions;
  const navigator = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();
  const { refreshedToken, user } = useAuth();

  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);
      const { data } = await api.get('/users/products');

      let newProductsArray = [] as ProductType[];

      data.forEach((product: any) => {
        const refactoredProduct = {
          ...product,
          user,
        } as ProductType;

        newProductsArray.push(refactoredProduct);
      })

      setProducts(newProductsArray);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível contar os anúncios, tente mais tarde'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoadingProducts(false);
    }
  }

  const itemsListWidth = (width - 72) / 2;

  function handleNewProduct() {
    navigator.navigate('newProduct');
  }

  useLayoutEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window }) => {
        setDimensions(window);
      }
    );
    return () => subscription?.remove();
  });

  useFocusEffect(useCallback(() => {
    fetchProducts();
  }, [refreshedToken]))
  
  return (
    <VStack flex={1} bg="gray.200" px={6} py={8}>
      <HStack justifyContent="space-between" alignItems="center" mb={8}>
        <View width={12} height={12}></View>
        <Heading fontSize="lg" color="gray.700" fontWeight="bold">Meus Anúncios</Heading>
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
          onPress={handleNewProduct}
        >
          <Plus size={24} color={colors.gray[700]} weight="bold"/>
        </Pressable>
      </HStack>
      <HStack justifyContent="space-between" alignItems="center" mb={8}>
        <Text fontSize="sm" color="gray.600" >{products.length} anúncios</Text>
        <Box maxW={112} pr={4}>
          <Select 
            selectedValue={selected} 
            minWidth="112"
            pr={4}
            accessibilityLabel="Escolha o filtro"
            _selectedItem={{
              _hover: {
                bg: "gray.200",
              },
              _focus: {
                bg: "gray.200",
              },
              _pressed:{
                bg: "gray.200",
              },
              _text: {
                fontFamily: fonts.heading,
                color: "gray.700",
              }
            }}
            onValueChange={itemValue => setSelected(itemValue)}
            dropdownOpenIcon={<CaretUp size={16} color={colors.gray[600]} style={{marginRight: 6}}/>}
            dropdownCloseIcon={<CaretDown size={16} color={colors.gray[600]} style={{marginRight: 6}}/>}
          >
            <Select.Item label="Todos" value="all" flex={1}/>
            <Select.Item label="Ativos" value="active" flex={1}/>
            <Select.Item label="Inativos" value="inactive" flex={1}/>
          </Select>
        </Box>
      </HStack>

      {
          isLoadingProducts ? <Loading /> : (
            products?.length > 0 ? (
              <FlatList 
                flex={1}
                data={products}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  marginBottom: 28,
                }}
                renderItem={({item})=> (
                  <ProductCard product={item} itemWidth={itemsListWidth} isOwner={true}/>
                )}
                _contentContainerStyle={{
                  pb: 8,
                }}
              />
            ) : (
              <Center flex={1}>
                <Text color="gray.600" textAlign="center">
                  Não há produtos cadastrados ainda {'\n'}
                  Que tal ser o primeiro? 😁
                </Text>
              </Center>
            )
          )
        }
    </VStack>
  );
}