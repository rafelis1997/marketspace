import { useState } from 'react';
import { Center, Text, VStack, Button as NativeButton, useTheme, Box, ScrollView, useToast } from "native-base";
import { PencilSimpleLine } from 'phosphor-react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'


import { Avatar } from "@components/Avatar";
import { TextInput } from "@components/TextInput";
import { PasswordInput } from "@components/PasswordInput";
import { Button } from "@components/Button";

import defaultUserAvatar from '@assets/userPhotoDefault.png'
import LogoIcon from '@assets/logoIcon.svg';
import { api } from '@services/api';
import { AppError } from '@utils/AppError';


type FormDataProps = {
  avatar?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirm: string;
}

type PhotoFileProps = {
  name: string;
  uri: string;
  type: string;
}

const signUpSchema = yup.object({
  name: yup.string().required("É necessário preencher um nome"),
  email: yup.string()
    .email("É necessário preencher um email válido")
    .required("É necessário preencher um email"),
  phone: yup.string()
    .matches(/^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/,
    "Coloque um número de celular num formato válido")
    .required("É necessário inserir um número de celular"),
  password: yup.string()
    .min(6, "A senha precisa ter 6 caracteres no mínimo")
    .required("É necessário inserir uma senha"),
  password_confirm: yup.string()
    .required("É necessário preencher a confirmação de senha")
    .oneOf([yup.ref("password"), null], "A senhas inseridas não são iguais")
})

export function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState<PhotoFileProps>();

  const { colors } = useTheme();

  const navigation = useNavigation();

  const toast = useToast();

  function handleGoToLogin() {
    navigation.goBack();
  }

  const { handleSubmit, control, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  async function handleUserPhotoSelect() {
    try {
      setIsPhotoLoading(true);
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4,4],
        allowsEditing: true,
        allowsMultipleSelection: false,
      })

      if(photoSelected.canceled) return;

      if(photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);

        if(photoInfo.size && (photoInfo.size / 1024 / 1024 > 5)) {
          return toast.show({
            title: "A foto escolhida é maior que 5MB, por favor escolha uma foto com tamanho menor",
            bg: 'red.500',
            placement: 'top',
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop();

        const photoFile = {
          name: `a.${fileExtension}`.toLocaleLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setUserPhoto(photoFile);
      }
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

  async function handleSignUp({name, password, email, phone}: FormDataProps) {
    try {
      setIsSubmitting(true);
      const userData = new FormData();

      userData.append('name', name);
      userData.append('email', email);
      userData.append('password', password);
      userData.append('tel', `+55${phone}`);


      userData.append('avatar', userPhoto as any)


      const response = await api.post('/users', userData, { 
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      toast.show({
        title: 'Conta Criada com sucesso',
        placement: 'top',
        bgColor: 'green.500',
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível realizar o cadastro"

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
      <VStack bg="gray.200" p={12} flex={1}>
        <Center flex={1}>
          <LogoIcon />

          <Text
            fontFamily="heading"
            fontSize={20}
            mt={3}
            mb={3}
          >
            Boas Vindas!
          </Text>

          <Text
            fontFamily="body"
            color="gray.600"
            textAlign="center"
          >
            Crie sua conta e use o espaço para comprar itens 
            variados e vender seus produtos
          </Text>

          <Box mb={6} mt={8}>
            <Avatar 
              size={24}
              source={userPhoto ? { uri: userPhoto.uri } : defaultUserAvatar}
              alt="Imagem do usuário"
            />
            <NativeButton 
              bg="blue.500" 
              rounded="full"
              position="absolute" 
              right={0} 
              bottom={0}
              size={10}
              onPress={handleUserPhotoSelect}
            >
              <PencilSimpleLine color={colors.gray[100]} size={16}/>
            </NativeButton>
          </Box>

          <Controller 
            name="name"
            control={control}
            render={({field: {value, onChange}}) => (
              <TextInput 
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller 
            name="email"
            control={control}
            render={({field: {value, onChange}}) => (
              <TextInput 
                placeholder="E-mail" 
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller 
            name="phone"
            control={control}
            render={({field: {value, onChange}}) => (
              <TextInput 
                placeholder="Telefone celular com DDD e só números"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.phone?.message}
              />
            )}
          />

          <Controller 
            name="password"
            control={control}
            render={({field: {value, onChange}}) => (
              <PasswordInput 
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller 
            name="password_confirm"
            control={control}
            render={({field: {onChange}}) => (
              <PasswordInput 
                placeholder="Confirmar senha"
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button 
            title="Criar" 
            variant="black" 
            mt={6} 
            onPress={handleSubmit(handleSignUp)}
            isLoading={isSubmitting}
          />

        </Center>

        <Center mt={8}>
          <Text color="gray.600">Já tem uma conta?</Text>
          <Button 
            title="Ir para login" 
            variant="gray" 
            mt={6} 
            onPress={handleGoToLogin} 
          />
        </Center> 
      </VStack>
    </ScrollView>
  );
}