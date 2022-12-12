import { HStack, Text, useTheme } from "native-base";
import { Bank, Barcode, CreditCard, Money, QrCode } from "phosphor-react-native";

export type PaymentMethodTextProps = {
  method: "boleto" | "pix" | "cash" | "card" | "deposit";
}

export function PaymentMethodText({ method }: PaymentMethodTextProps) {
  const { colors } = useTheme();
  return (
    <HStack width="100%" mb={2}>
      {method === 'boleto' && (
        <>
          <Barcode size={18} color={colors.gray[700]}/>
          <Text ml={3} color="gray.500">Boleto</Text>
        </>
      )}

      {method === 'pix' && (
        <>
          <QrCode size={18} color={colors.gray[700]}/>
          <Text ml={3} color="gray.500">Pix</Text>
        </>
      )}

      {method === 'cash' && (
        <>
          <Money size={18} color={colors.gray[700]}/>
          <Text ml={3} color="gray.500">Dinheiro</Text>
        </>
      )}

      {method === 'card' && (
        <>
          <CreditCard size={18} color={colors.gray[700]}/>
          <Text ml={3} color="gray.500">Cartão de Crédito</Text>
        </>
      )}

      {method === 'deposit' && (
        <>
          <Bank size={18} color={colors.gray[700]}/>
          <Text ml={3} color="gray.500">Depósito Bancário</Text>
        </>
      )}
    </HStack>
  );
}