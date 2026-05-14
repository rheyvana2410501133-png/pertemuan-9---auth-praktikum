import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
 StyleSheet,
} from 'react-native';

import { sendEmailVerification } from 'firebase/auth';
import { useAuth } from '../contexts/Authcontext';
import { useIdleLogout } from '../hooks/Useidlelogout';
import { auth } from '../config/Firebase';

import S, { COLORS } from '../styles/globalStyles';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { resetTimer } = useIdleLogout();

  const cekVerif = async () => {
    await auth.currentUser.reload();

    Alert.alert(
      auth.currentUser.emailVerified ? 'Berhasil' : 'Belum',
      auth.currentUser.emailVerified
        ? 'Email sudah diverifikasi'
        : 'Cek inbox email kamu'
    );
  };

  const kirimUlang = async () => {
    await sendEmailVerification(auth.currentUser);
    Alert.alert('Sukses', 'Email verifikasi dikirim ulang');
  };

  return (
    <ScrollView
      style={S.scrollContainer}
      onTouchStart={resetTimer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.top}>
        <Text style={styles.title}>Selamat Datang</Text>

        <Text style={styles.email}>{user?.email}</Text>

        <Text
          style={{
            color: user?.emailVerified
              ? COLORS.success
              : COLORS.warning,
          }}
        >
          {user?.emailVerified
            ? '✓ Email terverifikasi'
            : '⚠ Belum verifikasi'}
        </Text>
      </View>

      <View style={[S.card, styles.card]}>
        <Text>Email: {user?.email}</Text>
        <Text>UID: {user?.uid}</Text>
      </View>

      {!user?.emailVerified && (
        <>
          <TouchableOpacity
            style={[S.btn, styles.btn]}
            onPress={cekVerif}
          >
            <Text style={S.btnText}>Cek Verifikasi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[S.btnOutline, styles.btn]}
            onPress={kirimUlang}
          >
            <Text style={S.btnOutlineText}>Kirim Ulang</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity
        style={[S.btn, S.btnDanger, styles.btn]}
        onPress={logout}
      >
        <Text style={S.btnText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  top: {
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  email: {
    marginVertical: 10,
    color: COLORS.textSecondary,
  },

  card: {
    marginHorizontal: 20,
    gap: 10,
  },

  btn: {
    marginHorizontal: 20,
    marginTop: 12,
  },
});