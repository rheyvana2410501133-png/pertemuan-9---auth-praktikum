import React, { useState } from 'react';
import {
  Text, TextInput, TouchableOpacity, Alert,
  ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../config/Firebase';
import S from '../styles/globalStyles';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password) return Alert.alert('Error', 'Isi email dan password');
    if (password.length < 6) return Alert.alert('Error', 'Password minimal 6 karakter');
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(cred.user);
      Alert.alert('Berhasil', 'Akun dibuat! Cek email untuk verifikasi.');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={S.centered}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={S.title}>Register</Text>
      <Text style={S.subtitle}>Buat akun untuk mulai menggunakan aplikasi</Text>

      <TextInput
        style={S.input}
        placeholder="Masukkan email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={[S.input, { marginTop: 14 }]}
        placeholder="Masukkan password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[S.btn, { marginTop: 18 }, loading && S.btnDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={S.btnText}>Daftar</Text>}
      </TouchableOpacity>

      <Text style={S.link} onPress={() => navigation.popToTop()}>
        Sudah punya akun? Login
      </Text>
    </KeyboardAvoidingView>
  );
}