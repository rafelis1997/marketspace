import { useMemo, useCallback, forwardRef, useEffect, useState } from 'react';
import { BottomSheetModal,  BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { Checkbox, Heading, HStack, Pressable, Switch, Text, useTheme, View, VStack } from 'native-base';
import { X } from 'phosphor-react-native';
import { useForm, Controller } from "react-hook-form";

import { useForwardRef } from '@hooks/UseFowardRef';
import { Tag } from './Tag';
import { Button } from './Button';

export type ModalFormData = {
  accept_trade: undefined | boolean;
  payment_methods: Array<string> | undefined;
}

export type BottomSheetModalProps = {
  handleSetFilters: (data: ModalFormData) => void;
}

export const FilterModal = forwardRef<BottomSheetModal, BottomSheetModalProps>(({handleSetFilters}, ref) => {
  const [, set] = useState([])
  const [isNew, setIsNew] = useState<boolean | undefined>()
  const myRef = useForwardRef<BottomSheetModal | null>(ref);

  const { handleSubmit, control, reset } = useForm<ModalFormData>({
    defaultValues: {
      accept_trade: undefined,
      payment_methods: undefined,
    }
  });

  const { colors } = useTheme();
  
  const snapPoints = useMemo(() => ['25%', '80%'], []);

  const handlePresentModalPress = useCallback(() => {
    myRef.current?.dismiss();
  }, []);

  function handleResetFilters() {
    reset();
    setIsNew(undefined);
  }

  function handleApplyFilters(data: ModalFormData) {
    const filters = {
      ...data,
      isNew,
    }
    handleSetFilters(filters);
    myRef.current?.dismiss();
  }

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
                <Tag 
                  title='NOVO' 
                  isChecked={isNew !== undefined && isNew === true ? true : false} 
                  bg={isNew !== undefined ? isNew === true ? 'blue.500' : 'gray.300' : 'gray.300'}
                  color={isNew ? "gray.100" : "gray.500"}
                  onPress={() => setIsNew(true)}
                />
                <Tag 
                  title='USADO' 
                  ml={2}
                  isChecked={isNew !== undefined && isNew === false ? true : false} 
                  bg={isNew !== undefined ? isNew === false ? 'blue.500' : 'gray.300' : 'gray.300'}
                  color={!isNew ? "gray.100" : "gray.500"}
                  onPress={() => setIsNew(false)}
                />
              </View>
            </VStack>

            <VStack width="full" mb={4} alignItems="flex-start">
              <Text color="gray.600" fontWeight="bold" mb={1}>Aceita troca?</Text>

              <Controller 
                name="accept_trade"
                control={control}
                render={({field: {onChange, value}}) => (
                  <Switch 
                    offTrackColor="gray.200"
                    onThumbColor="gray.100"
                    offThumbColor="gray.100"
                    onTrackColor="blue.500"
                    onToggle={onChange}
                    isChecked={value}
                    defaultIsChecked={false}
                  />
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

            
          </BottomSheetScrollView>
          <HStack flex={1} justifyContent="center" alignItems="flex-end" alignSelf="flex-end" px={6} maxH={42}>
              <Button title='Resetar filtros' mr={3} onPress={handleResetFilters}/>
              <Button title='Aplicar filtos' variant="black" onPress={handleSubmit(handleApplyFilters)}/>
          </HStack>
        </BottomSheetModal>
  );
});

