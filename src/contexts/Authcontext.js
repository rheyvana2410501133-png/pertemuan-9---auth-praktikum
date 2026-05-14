import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';

import { auth } from '../config/Firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async currentUser => {
      setUser(currentUser);

      if (currentUser) {
        const token = await currentUser.getIdToken();

        await SecureStore.setItemAsync(
          'auth_token',
          token
        );
      } else {
        await SecureStore.deleteItemAsync('auth_token');
      }

      setLoading(false);
    });

    return unsub;
  }, []);

  const logout = async () => {
    await signOut(auth);
    await SecureStore.deleteItemAsync('auth_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}