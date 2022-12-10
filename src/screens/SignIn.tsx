import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Center, ScrollView, Text, useToast, View, VStack } from "native-base";
import { useForm, Controller } from 'react-hook-form'
import { AppError } from "@utils/AppError";


import { Button } from "@components/Button";
import { TextInput } from "@components/TextInput";
import { PasswordInput } from "@components/PasswordInput";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import LogoSvg from '@assets/logo.svg';
import { AuthContext } from "@contexts/AuthContext";

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useContext(AuthContext);

  const toast = useToast();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { handleSubmit, control, formState: { errors }  } = useForm<FormData>()

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({email, password}: FormData) {
    try {
      setIsLoading(true);

      const lowerCaseEmail = email.toLowerCase();
      await signIn(lowerCaseEmail, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'
      
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false} >
        <VStack flex={1} bg="gray.200" rounded={24} px={12} pb={6}>
          <Center mt={20}>
            <LogoSvg />  

            <Text color='gray.600' mt={12} mb={4}>
              Acesse sua conta
            </Text>
            
            <Controller 
              name="email"
              control={control}
              rules= {{
                required: 'Informe o email',
              }}
              render={({field: { onChange, value } }) => (
                <TextInput 
                  placeholder="E-mail"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                  autoCapitalize='none'
                />
              )}
            />

            <Controller 
              name="password"
              control={control}
              rules= {{
                required: 'Informe a senha',
              }}
              render={({field: { onChange, value } }) => (
                <PasswordInput 
                  placeholder="Senha"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                  autoCapitalize='none'
                />
              )}
            />

            <Button 
              title="Entrar" 
              variant="blue" 
              mt={8} 
              onPress={handleSubmit(handleSignIn)}
              isLoading={isLoading}
            />
          </Center>
        </VStack>
        <VStack flex={1} bg="gray.100" px={12} mt={6} pb={10}>
            <Center flex={1}>
              <Text color='gray.600' mb={4}>Ainda não tem acesso?</Text>
              <Button title="Criar uma conta" onPress={handleNewAccount} maxH={14}/>
            </Center>
        </VStack>
      </ScrollView>
    </>
  )
}