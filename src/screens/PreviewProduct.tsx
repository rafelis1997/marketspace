import { Heading, HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import { Tag as TagIcon, ArrowLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

import { Avatar } from "@components/Avatar";
import { Carrousel } from "@components/Carroussel";
import { Tag } from "@components/Tag";
import { Button } from "@components/Button";

import defaultUserAvatar from '@assets/userPhotoDefault.png'
import { PaymentMethodText } from "@components/PaymentMethodText";


export function PreviewProduct() {
  const navigator = useNavigation();

  const data = [...new Array(3).keys()];

  function handleGoBack() {
    navigator.goBack();
  }

  return (
    <>
      <VStack justifyContent="flex-start" alignItems="center" px={4} pt={10} pb={6} bg="blue.500">
       <Heading fontSize="md" color="gray.100">Pré visualização do anúncio</Heading>
       <Text fontSize="sm" color="gray.100">É assim que seu produto vai aparecer!</Text>
      </VStack>

      <ScrollView flex={1} showsVerticalScrollIndicator={false} bg="gray.200" contentContainerStyle={{paddingBottom: 32}}>
        
        <Carrousel data={data} />

        <VStack flex={1} mt={5} px={6}>
          <HStack alignItems="center" mb={8}>
            <Avatar source={defaultUserAvatar} size={8} alt="avatar" mr={2}/>
            <Text color="gray.700" fontSize="md">Makenna Baptista</Text>
          </HStack>

          <VStack mb={8}>
            <Tag isChecked={false} title="NOVO" w={16} fontSize="xs"/>

            <HStack alignItems="center" justifyContent="space-between" mt={3} mb={3}>
              <Heading>Bicicleta</Heading>
              <Text color="blue.500" fontWeight="bold">
                R$ 
                <Heading color="blue.500"> 120,00</Heading>
              </Text>
            </HStack>

            <Text color="gray.500">
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. 
              Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet 
              nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis 
              in aliquam.
            </Text>
          </VStack>

          <VStack>
            <HStack mb={4}>
              <Text color="gray.500" fontWeight="bold">Aceita troca?</Text>
              <Text color="gray.500" ml={2}>Sim</Text>
            </HStack>

            <VStack>
              <Text color="gray.500" fontWeight="bold" mb={3}>Meios de pagamento:</Text>
              <PaymentMethodText method="boleto"/>
              <PaymentMethodText method="pix"/>
              <PaymentMethodText method="money"/>
              <PaymentMethodText method="credit-card"/>
              <PaymentMethodText method="deposit"/>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>

      <HStack px={6} safeAreaBottom py={6} bg="gray.100">
        <Button title="Voltar e editar" mr={3}>
          <ArrowLeft size={16}/>
        </Button>
        <Button title="Publicar" variant="blue">
          <TagIcon size={16}/>
        </Button>
      </HStack>
    </>
  );
}



