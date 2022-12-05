import { useMemo, useCallback, forwardRef, useEffect, useState } from 'react';
import { BottomSheetFooter, BottomSheetFooterProps, BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Checkbox, Heading, HStack, Pressable, Switch, Text, useTheme, View, VStack } from 'native-base';
import { X } from 'phosphor-react-native';
import { useForwardRef } from '@hooks/UseFowardRef';
import { Tag } from './Tag';
import { Button } from './Button';

export const FilterModal = forwardRef<BottomSheetModal>((props, ref) => {
  const [groupValues, setGroupValues] = useState([])
  const myRef = useForwardRef<BottomSheetModal | null>(ref);

  const { colors } = useTheme();
  
  const snapPoints = useMemo(() => ['25%', '80%'], []);

  const handlePresentModalPress = useCallback(() => {
    myRef.current?.dismiss();
  }, []);

  useEffect(() => {
    console.log(groupValues)
  }, [groupValues])

  return (
    <BottomSheetModal
          ref={myRef}
          index={1}
          snapPoints={snapPoints}
          handleStyle={{
            height: 32,
          }}
          handleIndicatorStyle={{
            backgroundColor: colors.gray['300'],
            width: 56,
          }}
          style={{
            shadowColor: "#000000",
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,

            elevation: 17,
                      }}
          backgroundStyle={{backgroundColor: colors.gray['100']}}
        >
        <HStack 
            width="full" 
            justifyContent="space-between" 
            alignItems="center"
            px={6}
            flex={1}
            maxH={8}
          >
            <Heading fontFamily="heading" fontSize="lg">Filtrar anúncios</Heading>
            <Pressable 
              onPress={handlePresentModalPress} 
              width={10} height={10} 
              justifyContent="center"
              alignItems="center"
            >
              <X size={24} color={colors.gray[400]}/>
            </Pressable>
          </HStack>
          <BottomSheetScrollView
            contentContainerStyle={{
              alignItems: "center",
            }}
            
            style={{
              flex: 1,
              padding: 24,
              paddingTop: 16,
            }}
          >
            <VStack width="full" mb={8}>
              <Text color="gray.600" fontWeight="bold" mb={3}>Condição</Text>
              <View flexDirection="row">
                <Tag title='NOVO' isChecked={true} mr={2}/>
                <Tag title='USADO' isChecked={false}/>
              </View>
            </VStack>

            <VStack width="full" mb={4} alignItems="flex-start">
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
                <Checkbox value='boleto' colorScheme="blue">Boleto</Checkbox>
                <Checkbox value='pix' colorScheme="blue">Pix</Checkbox>
                <Checkbox value='dinheiro' colorScheme="blue">Dinheiro</Checkbox>
                <Checkbox value='credit-card' colorScheme="blue">Cartão de Crédito</Checkbox>
                <Checkbox value='deposit' colorScheme="blue">Depósito</Checkbox>
              </Checkbox.Group>
            </VStack>

            
          </BottomSheetScrollView>
          <HStack flex={1} justifyContent="center" alignItems="flex-end" alignSelf="flex-end" px={6} maxH={42}>
              <Button title='Resetar filtros' mr={3}/>
              <Button title='Aplicar filtos' variant="black"/>
          </HStack>
        </BottomSheetModal>
  );
});

