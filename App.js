// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/contexts/Authcontext';

// Screens
import LoginScreen from './src/screens/Loginscreen';
import RegisterScreen from './src/screens/Registerscreen';
import ForgotPasswordScreen from './src/screens/Forgotpasswordscreen';
import HomeScreen from './src/screens/Homescreen';
import ChatScreen from './src/screens/ChatScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Daftar' }} />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Lupa Password' }}
      />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Beranda', headerLeft: () => null }}
      />
      {/* ── Tambahan: ChatScreen ── */}
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ title: 'Chat' }}
      />
    </Stack.Navigator>
  );
}

function Root() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}