import { useEffect, useLayoutEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Box, FlatList, Heading, HStack, Pressable, Select, Text, useTheme, View, VStack } from "native-base";
import { CaretDown, CaretUp, Plus } from "phosphor-react-native";

import { ProductCard } from "@components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

const items = ['1','2','3','4','5']
const window = Dimensions.get("window");

export function MyProducts() {
  const [selected, setSelected] = useState("all");
  const [dimensions, setDimensions] = useState(window);

  const { colors, fonts } = useTheme();
  const { width } = dimensions;
  const navigator = useNavigation<AppNavigatorRoutesProps>();

  const itemsListWidth = (width - 72) / 2;

  function handleGoToProduct() {
    navigator.navigate('product');
  }
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
        <Text fontSize="sm" color="gray.600" >9 anúncios</Text>
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
            <ProductCard itemWidth={itemsListWidth} onPress={handleGoToProduct}/>
          )}
          _contentContainerStyle={{
            pb: 8,
          }}
        />
    </VStack>
  );
}