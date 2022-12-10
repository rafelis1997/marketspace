import { Button } from "@components/Button";
import { PhotoBox } from "@components/PhotoBox";
import { useNavigation } from "@react-navigation/native";
import { Checkbox, Heading, HStack, Input, InputGroup, InputLeftAddon, Pressable, Radio, ScrollView, Switch, Text, TextArea, useTheme, View, VStack } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { useState } from "react";

export function CreateProduct() {
  const [photos, setPhotos] = useState(["1"]);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [radioValue, setRadioValue] = useState("");

  const { colors } = useTheme();
  const navigator = useNavigation();

  function handleGoBack() {
    navigator.goBack();
  }

  return (
    <>
      <HStack justifyContent="space-between" alignItems="center" bg="gray.200" px={6} py={6}>
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
        <Heading fontSize="lg" color="gray.700" fontWeight="bold" textAlign="center">Criar anúncio</Heading>
        <View width={12} height={12}></View>
      </HStack>

      <ScrollView flex={1} bg="gray.200" pt={0} px={6} py={8}>
        <VStack mb={8}>
            <Heading fontSize="md" color="gray.600" mb={4}>Imagens</Heading>
            <Text color="gray.500" mb={4}>
              Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
            </Text>

            <HStack >
              {photos.length > 0 && photos.map((item) => 
                <PhotoBox key={item} hasPhoto mr={2}/>
              )}

              {photos.length < 3 && 
                <PhotoBox />
              }
            </HStack>          
        </VStack>

        <VStack mb={8}>
          <Heading fontSize="md" color="gray.600" mb={4}>Sobre o produto</Heading>
          <Input 
            placeholder="Título do anúncio"
            placeholderTextColor="gray.400"
            fontSize="md"
            bg="gray.100" 
            borderWidth={0}
            py={3}
            px={4}
            mb={4}
          />

          <TextArea
            autoCompleteType={false}
            value={textAreaValue}
            onChange={text => setTextAreaValue(text)}
            placeholder="Descrição do produto"
            placeholderTextColor="gray.400"
            fontSize="md"
            bg="gray.100" 
            borderWidth={0}
            py={3}
            px={4}
            h={160}
            mb={4}
          />

          <Radio.Group name="productState" accessibilityLabel="Condições do produto" 
            value={radioValue} 
            onChange={nextValue => {
              setRadioValue(nextValue);
            }}
            colorScheme="blue"
          >
            <HStack alignItems="center">
              <Radio 
                value="new" 
                _text={{
                  fontSize: "sm",
                }}
              >
                Produto Novo
              </Radio>
              <Radio value="used" ml={3}>
                Produto Usado
              </Radio>
            </HStack>
          </Radio.Group>
        </VStack>

        <VStack>
          <Heading fontSize="md" color="gray.600" mb={4}>Venda</Heading>

          <HStack alignItems="center">
            <InputGroup 
              px={4}
            >
              <Input 
                placeholder="Valor do Produto"
                borderWidth={0}
                bg="gray.100"
                fontSize="md"
                InputLeftElement={
                  <Text fontSize="md" ml={4} color="gray.700">R$</Text>
                }
                mb={4}
              />
            </InputGroup>
          </HStack>

          <VStack width="full" alignItems="flex-start">
            <Text color="gray.600" fontWeight="bold" mb={1}>Aceita troca?</Text>
            <Switch 
              offTrackColor="gray.200"
              onThumbColor="gray.100"
              offThumbColor="gray.100"
              onTrackColor="blue.500"
            />
          </VStack>

          <VStack width="full" mb={16} alignItems="flex-start">
            <Text color="gray.600" fontWeight="bold" mb={3}>Meios de pagamento aceitos</Text>
            <Checkbox.Group >
              <Checkbox 
                value='boleto' 
                colorScheme="blue" 
                borderColor="gray.400" 
                borderWidth={1} 
                rounded="xs"
              >
                Boleto
              </Checkbox>

              <Checkbox 
                value='pix' 
                colorScheme="blue" 
                borderColor="gray.400" 
                borderWidth={1} 
                rounded="xs"
              >
                Pix
              </Checkbox>

              <Checkbox 
                value='dinheiro' 
                colorScheme="blue" 
                borderColor="gray.400" 
                borderWidth={1} 
                rounded="xs"
              >
                Dinheiro
              </Checkbox>

              <Checkbox value
                ='credit-card' 
                colorScheme="blue" 
                borderColor="gray.400" 
                borderWidth={1} 
                rounded="xs"
              >
                Cartão de Crédito
              </Checkbox>

              <Checkbox 
                value='deposit' 
                colorScheme="blue" 
                borderColor="gray.400" 
                borderWidth={1} 
                rounded="xs"
              >
                Depósito
              </Checkbox>
            </Checkbox.Group>
          </VStack>
        </VStack>
      </ScrollView>

      <HStack px={6} safeAreaBottom py={6}>
        <Button title="Cancelar" mr={3}/>
        <Button title="Avançar" variant="black"/>
      </HStack>
    </>
  );
}