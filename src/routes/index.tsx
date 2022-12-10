import { Box, useTheme } from "native-base";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";


export function Routes() {
  const { colors } = useTheme();
  const theme = DefaultTheme
  theme.colors.background = colors.gray[100];

  const { user } = useContext(AuthContext);

  return (
    <Box flex={1} bg='gray.100' safeArea>
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}