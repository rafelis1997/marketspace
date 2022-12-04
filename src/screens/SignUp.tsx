import { Center, Text, VStack, Button as NativeButton, useTheme, Box, ScrollView } from "native-base";
import { PencilSimpleLine } from 'phosphor-react-native'

import { Avatar } from "@components/Avatar";
import { TextInput } from "@components/TextInput";
import { PasswordInput } from "@components/PasswordInput";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";

import defaultUserAvatar from '@assets/userPhotoDefault.png'
import LogoIcon from '@assets/logoIcon.svg';

export function SignUp() {
  const { colors } = useTheme();

  const navigation = useNavigation();

  function handleGoToLogin() {
    navigation.goBack();
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
              source={defaultUserAvatar}
              alt="Imagem do usuário"
            />
            <NativeButton 
              bg="blue.500" 
              rounded="full"
              position="absolute" 
              right={0} 
              bottom={0}
              size={10}
            >
              <PencilSimpleLine color={colors.gray[100]} size={16}/>
            </NativeButton>
          </Box>

          <TextInput placeholder="Nome" />
          <TextInput placeholder="E-mail" />
          <TextInput placeholder="Telefone" />
          <PasswordInput />
          <PasswordInput placeholder="Confirmar senha"/>

          <Button title="Criar" variant="black" mt={6}/>

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