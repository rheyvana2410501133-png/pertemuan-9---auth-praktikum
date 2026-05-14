// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View, TextInput, TouchableOpacity, Text,
  Alert, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { auth } from '../config/Firebase';
import S from '../styles/globalStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email dan password wajib diisi.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await SecureStore.setItemAsync('saved_email', email);
      await SecureStore.setItemAsync('saved_password', password);
    } catch (e) {
      Alert.alert('Login gagal', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBiometric = async () => {
    const savedEmail = await SecureStore.getItemAsync('saved_email');
    const savedPassword = await SecureStore.getItemAsync('saved_password');
    if (!savedEmail || !savedPassword) {
      Alert.alert('Belum ada session', 'Silakan login dulu dengan password.');
      return;
    }
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert('Tidak didukung', 'Perangkat tidak memiliki sensor biometric.');
      return;
    }
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('Belum setup', 'Silakan setup fingerprint di pengaturan HP.');
      return;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login dengan biometric',
      fallbackLabel: 'Gunakan password',
      cancelLabel: 'Batal',
    });
    if (result.success) {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, savedEmail, savedPassword);
      } catch (e) {
        Alert.alert('Login gagal', 'Session expired, silakan login ulang.');
        await SecureStore.deleteItemAsync('saved_email');
        await SecureStore.deleteItemAsync('saved_password');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Gagal', 'Biometric tidak cocok.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={S.centered}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={S.title}>Selamat Datang</Text>
      <Text style={S.subtitle}>Login untuk melanjutkan</Text>

      <View style={S.formGroup}>
        <Text style={S.label}>Email</Text>
        <TextInput
          style={S.input}
          placeholder="contoh@email.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={S.formGroup}>
        <Text style={S.label}>Password</Text>
        <TextInput
          style={S.input}
          placeholder="Masukkan password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={[S.btn, loading && S.btnDisabled]} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={S.btnText}>Login</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={[S.btn, S.btnBio]} onPress={handleBiometric}>
        <Text style={S.btnText}>Login dengan Biometric</Text>
      </TouchableOpacity>

      <Text style={S.dividerText}>─── atau ───</Text>

      <Text style={S.link} onPress={() => navigation.navigate('Register')}>
        Belum punya akun? Daftar
      </Text>
      <Text style={S.link} onPress={() => navigation.navigate('ForgotPassword')}>
        Lupa password?
      </Text>
    </KeyboardAvoidingView>
  );
}