import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '@lib/supabase.ts';
import styles from './style';
import { Feather } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { toByteArray } from 'base64-js';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { maskEmail } from '@/app/utils/Utils';

const placeholderImage = require('@/app/assets/helpdesk.png');

export default function Profile() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  navigator = useNavigation();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error('Erro ao buscar a sessão:', error);
        Alert.alert('Erro de Rede', 'Não foi possível buscar a sessão.');
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = useCallback(async () => {
    if (session) {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('avatar_url, lastname, name, phone')
          .eq('id', session.user.id)
          .single();
        if (error) {
          throw error;
        }
        if (data) {
          setProfile(data);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível buscar os dados do perfil.');
      } finally {
        setLoading(false);
      }
    }
  }, [session]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile]),
  );

  const handleChoosePhoto = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (pickerResult.canceled === true) {
      return;
    }

    if (pickerResult.assets && pickerResult.assets.length > 0) {
      const uri = pickerResult.assets[0].uri;
      uploadAvatar(uri);
    }
  };

  const uploadAvatar = async (uri) => {
    if (!session) return;

    try {
      setUploading(true);

      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: 'base64',
      });

      const filePath = `${session.user.id}.png`;
      const contentType = 'image/png';

      const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, toByteArray(base64), { contentType, upsert: true });

      if (error) throw error;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

      let publicUrl = data.publicUrl;
      publicUrl = `${publicUrl}?t=${new Date().getTime()}`;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', session.user.id);

      if (updateError) throw updateError;

      setProfile({ ...profile, avatar_url: publicUrl });
    } catch (error) {
      Alert.alert('Erro no Upload', error.message);
    } finally {
      setUploading(false);
    }
  };

  if (!session || !profile) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  const imageSource = profile?.avatar_url
    ? { uri: profile.avatar_url }
    : placeholderImage;

  function handleSignOut() {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await supabase.auth.signOut();
        },
      },
    ]);
  }

  async function handleOpenInfo(infoDetails) {
    if (infoDetails[1] === 'email') {
      navigation.navigate('UpdateEmail', {
        data: infoDetails[0],
        nameColumn: infoDetails[1],
      });
    } else
      navigation.navigate('UpdateInfo', {
        data: infoDetails[0],
        nameColumn: infoDetails[1],
        text: infoDetails[2],
      });
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#28A745" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerItensWithPhoto}>
        <Pressable
          onPress={handleChoosePhoto}
          style={styles.pressableCircle}
          disabled={uploading}
        >
          <Image source={imageSource} style={styles.image} />
        </Pressable>
        <Pressable
          onPress={() =>
            handleOpenInfo([profile.name, 'name', 'primeiro nome'])
          }
        >
          <View style={styles.itens}>
            <Text style={styles.text}>Nome</Text>
            <View style={styles.edit}>
              <Text style={styles.textEdit}>{profile.name}</Text>
              <AntDesign name="right" size={15} color="#9a9797ff" />
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() =>
            handleOpenInfo([profile.lastname, 'lastname', 'sobrenome'])
          }
        >
          <View style={styles.itens}>
            <Text style={styles.text}>Sobrenome</Text>
            <View style={styles.edit}>
              <Text style={styles.textEdit}>{profile.lastname}</Text>
              <AntDesign name="right" size={15} color="#9a9797ff" />
            </View>
          </View>
        </Pressable>
      </View>

      <View style={styles.containerItens}>
        <Pressable
          onPress={() => handleOpenInfo([profile.phone, 'phone', 'celular'])}
        >
          <View style={styles.itens}>
            <Text style={styles.text}>Alterar telefone</Text>
            <View style={styles.edit}>
              <Text style={styles.textEdit}>{profile.phone}</Text>
              <AntDesign name="right" size={15} color="#9a9797ff" />
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() => handleOpenInfo([session.user.email, 'email'])}
        >
          <View style={styles.itens}>
            <Text style={styles.text}>Alterar email</Text>
            <View style={styles.edit}>
              <Text style={styles.textEdit}>
                {maskEmail(session.user.email)}
              </Text>
              <AntDesign name="right" size={15} color="#9a9797ff" />
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate('UpdatePassword', { isSession: true })
          }
        >
          <View style={styles.itens}>
            <Text style={styles.text}>Alterar senha</Text>
            <AntDesign name="right" size={15} color="#9a9797ff" />
          </View>
        </Pressable>
      </View>
      <View style={styles.containerItens}>
        <Pressable onPress={handleSignOut}>
          <View style={styles.itens}>
            <Text style={[styles.menuText, { color: '#E74C3C' }]}>Sair</Text>
            <Feather name="log-out" size={22} color="#E74C3C" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
