import React, { useState } from 'react';
import {
  Text, TextInput, TouchableOpacity, Alert,
  ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/Firebase';
import S from '../styles/globalStyles';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) return Alert.alert('Error', 'Masukkan email');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Berhasil', 'Link reset password sudah dikirim ke email kamu.');
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
      <Text style={S.title}>Lupa Password</Text>
      <Text style={S.subtitle}>Masukkan email untuk menerima link reset password.</Text>

      <TextInput
        style={S.input}
        placeholder="Masukkan email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[S.btn, { marginTop: 16 }, loading && S.btnDisabled]}
        onPress={handleReset}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={S.btnText}>Kirim Email</Text>}
      </TouchableOpacity>

      <Text style={S.link} onPress={() => navigation.popToTop()}>
        ← Kembali ke Login
      </Text>
    </KeyboardAvoidingView>
  );
}