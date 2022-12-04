import { Heading, HStack, Text, useTheme, VStack } from "native-base";
import { Plus } from "phosphor-react-native";

import { Avatar } from "./Avatar";
import { Button } from "./Button";

import defaultUserAvatar from '@assets/userPhotoDefault.png'

export function HomeHeader() {
  const { colors } = useTheme();

  return (
    <HStack width="full" mb={8}>
      <HStack mr={4} width="1/2">
        <Avatar source={ defaultUserAvatar } size={12} alt="Foto do usuário" mr={3}/>
        <VStack>
          <Text fontSize="md">
            Boas-vindas,
          </Text> 
          <Heading fontSize="md" fontFamily="heading">Rafael!</Heading>
        </VStack>
      </HStack>

      <Button title="Criar anúncio" variant="black">
        <Plus size={16} color={colors.gray['100']}/>
      </Button>
    </HStack>
  );
}