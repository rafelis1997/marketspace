import { Box, Center, FlatList, HStack, Text, useTheme, View, VStack } from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";
import { Dimensions, TouchableOpacity } from "react-native";

import { HomeHeader } from "@components/HomeHeader";
import { SearchBar } from "@components/SearchBar";
import { ProductCard } from "@components/ProductCard";
import { useEffect, useState } from "react";

const items = ['1','2','3','4','5']
const window = Dimensions.get("window");
export function Home() {
  const [dimensions, setDimensions] = useState(window);

  const { width } = dimensions;
  
  const itemsListWidth = (width - 72) / 2;

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window }) => {
        setDimensions(window);
      }
    );
    return () => subscription?.remove();
  });

  const { colors } = useTheme();

  return (
    <View flex={1} bg="gray.200" pt={16} px={6} justifyContent="flex-start">
      <HomeHeader />

      <Text
        color="gray.600"
        fontFamily="body"
        fontSize="sm"
      >
        Seus produtos anunciados para venda
      </Text>

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
              <Text fontFamily="heading" fontSize="lg" lineHeight="sm">4</Text>
              <Text fontFamily="body">anúncios ativos</Text>
            </VStack>
          </HStack>

          <TouchableOpacity>
            <Center flexDirection="row">
              <Text color="blue.700" fontWeight="bold" mr={2} lineHeight="sm">Meus anúncios</Text>
              <ArrowRight color={colors.blue[700]} size={16} weight="bold"/>
            </Center>
          </TouchableOpacity>
        </Center>
      </Box>

      <Text
        color="gray.600"
        fontFamily="body"
        fontSize="sm"
        mt={8}
      >
        Compre produtos variados
      </Text>

      <SearchBar mt={4} />

      <FlatList 
        flex={1}
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 28,
        }}
        renderItem={({item})=> (
          <ProductCard itemWidth={itemsListWidth}/>
        )}
        _contentContainerStyle={{
          pb: 8,
        }}
      />
    </View>
  );
}