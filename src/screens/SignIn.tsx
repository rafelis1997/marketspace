import { Center, ScrollView, Text, View, VStack } from "native-base";


import LogoSvg from '@assets/logo.svg';
import { Button } from "@components/Button";
import { TextInput } from "@components/TextInput";
import { PasswordInput } from "@components/PasswordInput";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg="gray.200" rounded={24} px={12} >
        <Center mt={24}>
          <LogoSvg />  

          <Text color='gray.600' mt={12} mb={4}>
            Acesse sua conta
          </Text>
          
          <TextInput placeholder="E-mail"/>
          <PasswordInput placeholder="Senha"/>

          <Button title="Entrar" variant="blue" mt={8}/>
        </Center>
      </VStack>
      <VStack flex={1} bg="gray.100" px={12}>
        <Center flex={1}>
          <Text color='gray.600' mb={4}>Ainda não tem acesso?</Text>
          <Button title="Criar uma conta" onPress={handleNewAccount}/>
        </Center>
      </VStack>
    </ScrollView>
  )
}