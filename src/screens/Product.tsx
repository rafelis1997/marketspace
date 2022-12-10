import { Heading, HStack, Pressable, ScrollView, Text, useTheme, VStack } from "native-base";
import { ArrowLeft, Pencil, PencilSimpleLine, Power, Trash, WhatsappLogo } from "phosphor-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Avatar } from "@components/Avatar";
import { Carrousel } from "@components/Carroussel";
import { Tag } from "@components/Tag";
import { Button } from "@components/Button";

import defaultUserAvatar from '@assets/userPhotoDefault.png'
import { PaymentMethodText } from "@components/PaymentMethodText";

type RouteParams = {
  isOwner?: boolean;
}

export function Product() {
  const { colors } = useTheme();
  const navigator = useNavigation();

  const data = [...new Array(3).keys()];

  const route = useRoute();

  const { isOwner } = route.params as RouteParams;

  function handleGoBack() {
    navigator.goBack();
  }

  return (
    <>
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
            <Heading fontFamily="heading" color="blue.700" lineHeight="3rem"> 120,00</Heading>
          </Text>
          <Button title="Entrar em contato" variant="blue" maxWidth="50%">
            <WhatsappLogo weight="fill"/>
          </Button>
        </HStack>

      )}
    </>
  );
}
