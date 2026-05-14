# Authentication & Authorization - Pertemuan 9
Aplikasi React Native (Expo) dengan full authentication flow menggunakan Firebase Auth.

## Fitur Praktikum (Step 1–8)
| Step | Fitur |
|------|-------|
| 1 | Inisialisasi project Expo blank template |
| 2 | Konfigurasi Firebase dengan initializeAuth dan AsyncStorage persistence |
| 3 | AuthContext  global user state + JWT ke SecureStore |
| 4 | Login & Register Email/Password |
| 5 | Protected Routes Auth Stack vs App Stack |
| 6 | Password Reset & Email Verification |
| 7 | Biometric Login menggunakan Fingerprint |
| 8 | Pengujian end-to-end di Expo Go |

## Tugas Mandiri Auto-logout Idle
Fitur: Auto-logout setelah 5 menit tidak ada aktivitas

### Cara Kerja
- Menggunakan AppState dari React Native dan setTimeout
- Setiap kali user menyentuh layar, timer direset
- App akan otomatis logout jika tidak ada aktivitas selama 5 menit
- Timer akan direset jika app masuk background lalu kembali ke foreground

### File Terkait
- src/hooks/Useidlelogout.js : logika timer idle
- src/screens/Homescreen.js : memanggil resetTimer() di onTouchStart

## Instalasi
npx expo install firebase expo-secure-store expo-local-authentication
npx expo install @react-native-async-storage/async-storage
npm install @react-navigation/native @react-navigation/native-stack --legacy-peer-deps
npx expo install react-native-screens react-native-safe-area-context
npx expo start

## Dependencies
- firebase : Firebase Auth
- expo-secure-store : JWT token storage
- expo-local-authentication : Biometric login
- @react-native-async-storage/async-storage : Auth persistence
- @react-navigation/native : Navigation
- @react-navigation/native-stack : Stack navigator
