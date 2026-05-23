# Authentication Authorization & Chat App
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

## Link Video Demo
[klik disini] https://drive.google.com/drive/folders/1E4lM5O6jiibJmFBGVJOb_397rvcquZeG

# Chat App - Pertemuan 11

Aplikasi React Native (Expo) dengan fitur chat real-time menggunakan Firebase Firestore.

## Fitur Praktikum
| Fitur | Keterangan |
|-------|-----------|
| Autentikasi | Login/Register email |
| Send Message | Kirim pesan teks real-time |
| Real-time | Update instan menggunakan onSnapshot listener |
| Upload Foto (bonus) | Untuk fitur kirim foto di chat, saya pakai Cloudinary untuk upload gambar, bukan Firebase Storage. Salasannya Cloudinary lebih nyaman dipakai buat ngatur file gambar, uploadnya juga simpel, terus ada fitur optimasi otomatis seperti compress dan resize gambar, dan paling penting tidak menggunakan biaya. Jadi foto yang dikirim bisa tetap bagus tapi ukuran filenya lebih ringan dan loading di aplikasi jadi lebih cepat. |

## Firestore Schema
```
messages/
  {msgId}/
    senderId: string
    senderEmail: string
    text: string
    imageURL: string
    timestamp: Timestamp
    read: boolean
```

## File Terkait
- src/screens/ChatScreen.js : tampilan chat + kirim pesan + upload foto
- src/config/Firebase.js : konfigurasi Firebase Auth & Firestore

## Instalasi
```
npx expo install expo-image-picker
npx expo start
```

## Dependencies
- firebase : Firebase Auth & Firestore
- expo image picker : Pilih foto dari galeri

## Link Video Demo
[klik disini] https://drive.google.com/drive/folders/1E4lM5O6jiibJmFBGVJOb_397rvcquZeG
