import { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dimensions, TouchableOpacity} from "react-native";
import { Box, Center, FlatList, HStack, Text, useTheme, useToast, View, VStack } from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet'

import { HomeHeader } from "@components/HomeHeader";
import { SearchBar } from "@components/SearchBar";
import { ProductCard } from "@components/ProductCard";
import { BottomSheetModalProps, FilterModal, ModalFormData } from "@components/FilterModal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AuthContext } from "@contexts/AuthContext";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { Loading } from "@components/Loading";
import { MyProductsBanner } from "@components/MyProductsBanner";

export type PaymentMethods = {
  pix: string;
  card: string;
  boleto: string;
  cash: string;
  deposit: string;
}

type QueryParams = {
  isNew?: boolean | undefined;
  accept_trade?: boolean | undefined;
  payment_methods?: Array<string> | undefined;
  query?: string;
}


const items = ['1','2','3','4','5']
const window = Dimensions.get("window");

export function Home() {
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [dimensions, setDimensions] = useState(window);
  const [filters, setFilters] = useState<QueryParams>({} as QueryParams);
  const [products, setProducts] = useState([])

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  
  const { width } = dimensions;
  const { colors } = useTheme();

  const toast = useToast();

  const { user } = useContext(AuthContext);
  
  const itemsListWidth = (width - 72) / 2;

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);



  async function fetchProducts() {
    try {
      setIsLoadingProducts(true);

      const { data } = await api.get('/products/');

      setProducts(data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível os produtos, tente mais tarde'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoadingProducts(false);
    }
  }

  function handleSetFilters(data: ModalFormData) {
    setFilters(data);
  }

  function handleSearchText(search: string) {
    if (search.length > 0) {
      let newFilters = {
        ...filters,
        query: search,
      };

      setFilters(newFilters);
    } else {
      let newFilters = filters;
      delete newFilters.query;
      
      setFilters(newFilters);
    }
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
  }, []))


  return (
    <BottomSheetModalProvider>
      <View flex={1} bg="gray.200" pt={10} px={6} justifyContent="flex-start">
        
        <FilterModal ref={bottomSheetModalRef} handleSetFilters={handleSetFilters}/>

        <HomeHeader />

        <Text
          color="gray.600"
          fontFamily="body"
          fontSize="sm"
        >
          Seus produtos anunciados para venda
        </Text>

        <MyProductsBanner />

        <Text
          color="gray.600"
          fontFamily="body"
          fontSize="sm"
          mt={8}
        >
          Compre produtos variados
        </Text>

        <SearchBar mt={4} openFilterModal={handlePresentModalPress} onChangeText={handleSearchText}/>

        {
          isLoadingProducts ? <Loading /> : (
            products?.length > 0 ? (
              <FlatList 
                flex={1}
                data={products}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  marginBottom: 28,
                }}
                renderItem={({item})=> (
                  <ProductCard product={item} itemWidth={itemsListWidth}/>
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

        
      </View>
    </BottomSheetModalProvider>
  );
}
