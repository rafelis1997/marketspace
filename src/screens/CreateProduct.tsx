import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { 
  Checkbox, 
  FormControl, 
  Heading, 
  HStack, 
  Input, 
  InputGroup, 
  Pressable, 
  Radio, 
  ScrollView, 
  Switch, 
  Text, 
  TextArea, 
  useTheme, 
  useToast, 
  View, 
  VStack } from "native-base";
import { ArrowLeft } from "phosphor-react-native";
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

import { Button } from "@components/Button";
import { PhotoBox } from "@components/PhotoBox";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "@components/TextInput";
import { ProductDTO } from "@dtos/ProductDTO";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export type PhotoType = {
  name: string;
  uri: string;
  type: string;
}

const newProductSchema = yup.object({
  title: yup.string().required("Coloque um título"),
  description: yup.string().required("Coloque uma descrição"),
  isNew: yup.string().required("Escolha as condições do produto"),
  price: yup.number().required("Preencha o valor do produto"),
  accept_trade: yup.boolean(),
  payment_methods: yup.array(yup.string().defined()).min(1, "Preencha ao menos um método de pagamento").required(),
});

type NewProductFormProps = yup.InferType<typeof newProductSchema>;

export function CreateProduct() {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [product, setProduct] = useState<ProductDTO>({} as ProductDTO);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);

  const { colors } = useTheme();
  const navigator = useNavigation<AppNavigatorRoutesProps>();
  const toast = useToast();
  const { control, handleSubmit} = useForm<NewProductFormProps>({
    resolver: yupResolver(newProductSchema),
    defaultValues: {
      isNew: "new",
      accept_trade: false,
    }
  });

  function handleGoBack() {
    navigator.goBack();
  }

  function handlePhotoRemove(index: number) {
    let newPhotosArray = photos;
    newPhotosArray = newPhotosArray.filter(photo => photo !== photos[index]);

    setPhotos(newPhotosArray);
  }

  async function handleProductPhotosSelection() {
    try {
      setIsPhotoLoading(true);
      const photosSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4,4],
        allowsMultipleSelection: true,
        selectionLimit: 3 - photos.length,
      })

      if(photosSelected.canceled) return;


      photosSelected.assets.forEach(async (photo) => {
        if(photo.uri) {
          const photoInfo = await FileSystem.getInfoAsync(photo.uri);
  
          if(photoInfo.size && (photoInfo.size / 1024 / 1024 > 5)) {
            return toast.show({
              title: "A foto escolhida é maior que 5MB, por favor escolha uma foto com tamanho menor",
              bg: 'red.500',
              placement: 'top',
            });
          }
  
          const fileExtension = photo.uri.split('.').pop();
          
          const photoFile = {
            name: `a.${fileExtension}`.toLocaleLowerCase(),
            uri: photo.uri,
            type: `${photo.type}/${fileExtension}`,
          } as any;
          
          setPhotos((prevState) => prevState.concat(photoFile));
        }
      })

    } catch (error) {
      toast.show({
        title: "Não foi possível selecionar a foto",
        bg: 'red.500',
        placement: 'top',
      });
    } finally {
      setIsPhotoLoading(false);
    }
  }

  function handleProductPreview({
    accept_trade,
    description,
    isNew,
    payment_methods,
    price,
    title 
  }: NewProductFormProps) {
    const newProduct = {
      accept_trade,
      description,
      isNew,
      payment_methods,
      price,
      title
    } as ProductDTO;

    setProduct(newProduct);
    // console.log(product);
    navigator.navigate("previewProduct", { photos, product })
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
              {photos.length > 0 && photos.map((item, index) => 
                <PhotoBox 
                  key={item.uri} 
                  hasPhoto 
                  mr={2} 
                  imgPath={item.uri} 
                  onPress={() => handlePhotoRemove(index)}
                />
              )}

              {photos.length < 3 && 
                <PhotoBox onPress={handleProductPhotosSelection}/>
              }
            </HStack>          
        </VStack>

        <VStack mb={8}>
          <Heading fontSize="md" color="gray.600" mb={4}>Sobre o produto</Heading>
          <Controller 
            name="title"
            control={control}
            render={({field: {value, onChange}}) => (
              <Input 
                placeholder="Título do anúncio"
                placeholderTextColor="gray.400"
                fontSize="md"
                bg="gray.100" 
                borderWidth={0}
                py={3}
                px={4}
                mb={4}
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Controller 
            control={control}
            name="description"
            render={({field: {value, onChange}}) => (
              <TextArea
                autoCompleteType={true}
                value={value}
                onChangeText={onChange}
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
            )}
          />

          <Controller 
            control={control}
            name="isNew"
            render={({field: {value, onChange}}) => (
              <FormControl>
                <Radio.Group name="productState" accessibilityLabel="Condições do produto" 
                  value={value} 
                  onChange={onChange}
                  colorScheme="blue"
                  defaultValue="new"
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
              </FormControl>
            )}
          />
        </VStack>

        <VStack>
          <Heading fontSize="md" color="gray.600" mb={4}>Venda</Heading>

          <HStack alignItems="center">
            <Controller 
              control={control}
              name="price"
              render={({field: {value, onChange}}) => (
                <InputGroup 
                  px={4}
                >
                  <TextInput 
                    placeholder="Valor do Produto"
                    borderWidth={0}
                    value={value?.toString()}
                    onChangeText={onChange}
                    bg="gray.100"
                    fontSize="md"
                    InputLeftElement={
                      <Text fontSize="md" ml={4} color="gray.700">R$</Text>
                    }
                    mb={4}
                    keyboardType="numeric"
                  />
                </InputGroup>
              )}
            />
          </HStack>

          <VStack width="full" alignItems="flex-start">
            <Text color="gray.600" fontWeight="bold" mb={1}>Aceita troca?</Text>
            <Controller 
              control={control}
              name="accept_trade"
              render={({field: {value, onChange}}) => (
                <FormControl flex={1} flexDirection="row">
                  <Switch 
                    offTrackColor="gray.200"
                    onThumbColor="gray.100"
                    offThumbColor="gray.100"
                    onTrackColor="blue.500"
                    isChecked={value}
                    onToggle={onChange}
                  />
                </FormControl>
              )}
            />
          </VStack>

          <VStack width="full" mb={16} alignItems="flex-start">
            <Text color="gray.600" fontWeight="bold" mb={3}>Meios de pagamento aceitos</Text>
            <Controller 
                name='payment_methods'
                control={control}
                render={({field: {onChange, value}}) => (
                  <Checkbox.Group value={value} onChange={onChange}>
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
                )}
              />
          </VStack>
        </VStack>
      </ScrollView>

      <HStack px={6} safeAreaBottom py={6} bg="gray.100">
        <Button title="Cancelar" mr={3}/>
        <Button title="Avançar" variant="black" onPress={handleSubmit(handleProductPreview)}/>
      </HStack>
    </>
  );
}