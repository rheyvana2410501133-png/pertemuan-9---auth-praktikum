// src/screens/ChatScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../config/Firebase';
import { useAuth } from '../contexts/Authcontext';
import { COLORS } from '../styles/globalStyles';

const CLOUDINARY_CLOUD_NAME = 'dvydmrdjv';
const CLOUDINARY_UPLOAD_PRESET = 'profil';

export default function ChatScreen() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const flatListRef = useRef(null);

  // onSnapshot: 
  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Upload foto ke Cloudinary 
  const uploadToCloudinary = async (uri) => {
    const formData = new FormData();
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'chat_image.jpg',
    });
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );
    const data = await response.json();
    return data.secure_url;
  };

  // Pilih foto dari galeri 
  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Izin ditolak', 'Izinkan akses galeri untuk kirim foto.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setUploading(true);
      try {
        const imageUrl = await uploadToCloudinary(result.assets[0].uri);
        await addDoc(collection(db, 'messages'), {
          senderId: user.uid,
          senderEmail: user.email,
          text: '',
          imageURL: imageUrl,
          timestamp: serverTimestamp(),
          read: false,
        });
      } catch (err) {
        Alert.alert('Error', 'Gagal upload foto.');
        console.error(err);
      } finally {
        setUploading(false);
      }
    }
  };

  // Kirim pesan teks 
  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setText('');
    try {
      await addDoc(collection(db, 'messages'), {
        senderId: user.uid,
        senderEmail: user.email,
        text: trimmed,
        imageURL: '',
        timestamp: serverTimestamp(),
        read: false,
      });
    } catch (err) {
      console.error('Gagal kirim pesan:', err);
    }
  };

  // Format waktu 
  const formatTime = timestamp => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Render tiap bubble pesan 
  const renderItem = ({ item }) => {
    const isMe = item.senderId === user.uid;
    return (
      <View style={[styles.bubbleWrapper, isMe ? styles.wrapperMe : styles.wrapperOther]}>
        {!isMe && (
          <Text style={styles.senderLabel}>
            {item.senderEmail?.split('@')[0]}
          </Text>
        )}
        <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
          {item.imageURL ? (
            <Image
              source={{ uri: item.imageURL }}
              style={styles.chatImage}
              resizeMode="cover"
            />
          ) : (
            <Text style={[styles.msgText, isMe && { color: '#fff' }]}>
              {item.text}
            </Text>
          )}
          <Text style={[styles.timeText, isMe && { color: 'rgba(255,255,255,0.7)' }]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: COLORS.textSecondary }}>
          Memuat pesan...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada pesan. Mulai ngobrol! 💬</Text>
          </View>
        }
      />

      {/* Input area */}
      <View style={styles.inputArea}>
        {/* Tombol foto */}
        <TouchableOpacity
          style={styles.photoBtn}
          onPress={handlePickImage}
          disabled={uploading}
        >
          {uploading
            ? <ActivityIndicator size="small" color={COLORS.primary ?? '#4A90E2'} />
            : <Text style={styles.photoBtnText}>📷</Text>
          }
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Ketik pesan..."
          value={text}
          onChangeText={setText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
          onPress={handleSend}
          disabled={!text.trim()}
        >
          <Text style={styles.sendBtnText}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 12,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
  bubbleWrapper: {
    marginVertical: 4,
    maxWidth: '75%',
  },
  wrapperMe: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  wrapperOther: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  senderLabel: {
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
    marginLeft: 4,
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  bubbleMe: {
    backgroundColor: COLORS.primary ?? '#4A90E2',
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  msgText: {
    fontSize: 15,
    color: '#222',
    lineHeight: 21,
  },
  timeText: {
    fontSize: 10,
    color: '#aaa',
    marginTop: 4,
    textAlign: 'right',
  },
  chatImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 8,
  },
  photoBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoBtnText: {
    fontSize: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    maxHeight: 100,
  },
  sendBtn: {
    backgroundColor: COLORS.primary ?? '#4A90E2',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: '#ccc',
  },
  sendBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});