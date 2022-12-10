import { Heading, HStack, Text, useTheme, VStack } from "native-base";
import { Plus } from "phosphor-react-native";

import { Avatar } from "./Avatar";
import { Button } from "./Button";

import defaultUserAvatar from '@assets/userPhotoDefault.png'
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { api } from "@services/api";

export function HomeHeader() {
  const { colors } = useTheme();

  const { user } = useContext(AuthContext);

  return (
    <HStack width="full" mb={8}>
      <HStack mr={4} width="1/2">
        <Avatar 
          source={user.avatar ? 
            { uri: `${api.defaults.baseURL}/images/${user.avatar}` } : 
            defaultUserAvatar } 
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

      <Button title="Criar anúncio" variant="black">
        <Plus size={16} color={colors.gray['100']}/>
      </Button>
    </HStack>
  );
}