import { Heading, HStack, Text, useTheme, VStack } from "native-base";
import { Plus } from "phosphor-react-native";

import { Avatar } from "./Avatar";
import { Button } from "./Button";

import defaultUserAvatar from '@assets/userPhotoDefault.png'
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { api } from "@services/api";
import { useAuth } from "@hooks/useAuth";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation } from "@react-navigation/native";

export function HomeHeader() {
  const { colors } = useTheme();

  const { user } = useAuth();

  const navigator = useNavigation<AppNavigatorRoutesProps>();

  function handleCreateProduct() {
    navigator.navigate('newProduct');
  }

  return (
    <HStack width="full" mb={8}>
      <HStack mr={4} width="1/2">
        <Avatar 
          avatarPath={user.avatar}
          size={12} 
          alt="Foto do usuário" 
          mr={3}
        />
        <VStack>
          <Text fontSize="md">
            Boas-vindas,
          </Text> 
          <Heading fontSize="md" fontFamily="heading">{user.name.split(' ')[0]}!</Heading>
        </VStack>
      </HStack>

      <Button title="Criar anúncio" variant="black" onPress={handleCreateProduct}>
        <Plus size={16} color={colors.gray['100']}/>
      </Button>
    </HStack>
  );
}