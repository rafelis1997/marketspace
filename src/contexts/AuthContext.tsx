import { ReactNode, createContext, useState, useEffect } from 'react';

import { UserDTO } from "@dtos/UserDTO";
import { api } from '@services/api';
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from '@storage/storageAuthToken';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
  refreshedToken: string; 
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [refreshedToken, setRefreshedToken] = useState('')
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  function userAndTokenUpdate({userData, token}: {userData: UserDTO, token: string}) {
    api.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    setUser(userData);
  }

  async function storageUserAndTokenSave({userData, token}: {userData: UserDTO, token: string}) {
    try {
      setIsLoadingUserStorageData(true);

      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {email, password});

      if(data.user && data.token) {
        await storageUserAndTokenSave({userData: data.user, token: data.token})

        userAndTokenUpdate({userData: data.user, token: data.token});
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();

    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);

      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();

      if(userLogged && token) {
        userAndTokenUpdate({userData: userLogged, token})
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  function refreshTokenUpdated(newToken: string) {
    setRefreshedToken(newToken);
  }

  useEffect(() => {
    loadUserData();
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager({signOut, refreshTokenUpdated});

    return () => {
      subscribe();
    }
  }, [signOut])


  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
      isLoadingUserStorageData,
      refreshedToken,
    }}>
      {children}
    </AuthContext.Provider>
  );
}