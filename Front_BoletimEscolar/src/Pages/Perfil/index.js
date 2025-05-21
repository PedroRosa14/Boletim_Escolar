import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, Modal, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBoletim } from '../../services/api.js';  // sua store Zustand

const emotes = {
  feliz: require('../../../assets/img_emojifeliz.png'),
  neutro: require('../../../assets/img_emojiserio.png'),
  triste: require('../../../assets/img_emojitriste.png'),
};

const getEmote = (media) => {
  if (media >= 7) return emotes.feliz;
  if (media >= 5) return emotes.neutro;
  return emotes.triste;
};

export default function Perfil({ navigation, route }) {
  const { fetchAlunoById, atualAluno, loading } = useBoletim();
  const [menuVisible, setMenuVisible] = useState(false);

  const alunoId = route?.params?.id; // recebe id passado na navegação

  useEffect(() => {
    if (alunoId) {
      fetchAlunoById(alunoId);
    }
  }, [alunoId]);

  if (loading || !atualAluno) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  const emote = getEmote(atualAluno.notamedia);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../../assets/mygrades_semfundo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuIcon}>
          <Ionicons name="menu" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Menu lateral */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalMenu}>
            <TouchableOpacity onPress={() => setMenuVisible(false)} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('Inicio'); }}>
              <Text style={styles.menuItem}>Início</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('Cadastro'); }}>
              <Text style={styles.menuItem}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('Editar'); }}>
              <Text style={styles.menuItem}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('Excluir'); }}>
              <Text style={styles.menuItem}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Conteúdo do perfil */}
      <View style={styles.card}>
        <Image source={{ uri: atualAluno.url }} style={styles.profileImage} />
        <Text style={styles.label}>Nome : <Text style={styles.value}>{atualAluno.nome}</Text></Text>
        <Text style={styles.label}>Média : <Text style={styles.value}>{atualAluno.notamedia}</Text></Text>
        <View style={styles.satisfacaoRow}>
          <Text style={styles.label}>Satisfação : </Text>
          <Image source={emote} style={styles.emote} />
        </View>
      </View>

      {/* Botão voltar */}
      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>2025 MyGrades</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#A2C8F2' },

  header: {
    height: 80,
    backgroundColor: '#2980b9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: -20,
  },
  menuIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
  },
  modalMenu: {
    backgroundColor: '#2980b9',
    width: 250,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  menuItem: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 10,
  },

  card: {
    backgroundColor: '#77A9E2',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 120,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 45,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
  },
  value: {
    fontWeight: 'bold',
  },
  satisfacaoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emote: {
    width: 22,
    height: 22,
    marginLeft: 5,
  },

  botaoVoltar: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  footer: {
    backgroundColor: '#2980b9',
    paddingVertical: 30,
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});
