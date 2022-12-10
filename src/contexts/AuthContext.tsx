import { ReactNode, createContext, useState } from 'react';

import { UserDTO } from "@dtos/UserDTO";
import { api } from '@services/api';
import { storageUserRemove, storageUserSave } from '@storage/storageUser';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUserStorageData(true);
      const { data } = await api.post('/sessions', {email, password});

      if(data.user) {
        await storageUserSave(data.user);
        setUser(data.user);
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

    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }


  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}