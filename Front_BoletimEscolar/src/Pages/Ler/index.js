import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBoletim } from '../../services/api.js'; // seu hook que chama a API

// Emotes locais
const emotes = {
  feliz: require('../../../assets/img_emojifeliz.png'),
  neutro: require('../../../assets/img_emojiserio.png'),
  triste: require('../../../assets/img_emojitriste.png'),
};

function getEmote(media) {
  if (media >= 7) return emotes.feliz;
  if (media >= 5) return emotes.neutro;
  return emotes.triste;
}

export default function TabelaNotas({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { alunos, loading, error, fetchAlunos } = useBoletim();

  useEffect(() => {
    fetchAlunos();
  }, []);

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

      {/* Modal lateral */}
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
            <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('Perfil'); }}>
              <Text style={styles.menuItem}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('Cadastro'); }}>
              <Text style={styles.menuItem}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMenuVisible(false); navigation.navigate('Excluir'); }}>
              <Text style={styles.menuItem}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Loading e Erro */}
      {loading && <Text style={{ textAlign: 'center', marginVertical: 10 }}>Carregando...</Text>}
      {error && <Text style={{ textAlign: 'center', marginVertical: 10, color: 'red' }}>{error}</Text>}

      {/* Tabela */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={[styles.row, styles.headerRow]}>
              {['Nome', 'Matemática', 'Português', 'História', 'Média', 'Satisfação', 'Ações'].map((col, i) => (
                <Text key={i} style={[styles.cell, styles.headerText]}>{col}</Text>
              ))}
            </View>

            {/* Renderiza alunos da API */}
            {alunos.length === 0 && !loading && (
              <View style={styles.row}>
                <Text style={[styles.cell, { textAlign: 'center' }]} >Nenhum aluno encontrado.</Text>
              </View>
            )}

            {alunos.map((aluno, i) => (
              <View key={i} style={styles.row}>
                <Text style={styles.cell}>{aluno.nome}</Text>
                <Text style={styles.cell}>{aluno.notamat}</Text>
                <Text style={styles.cell}>{aluno.notaport}</Text>
                <Text style={styles.cell}>{aluno.notahist}</Text>
                <Text style={styles.cell}>{aluno.notamedia}</Text>
                <View style={[styles.cell, styles.emoteCell]}>
                  <Image source={getEmote(Number(aluno.notamedia))} style={styles.emote} />
                </View>
                <View style={styles.acoes}>
                  <TouchableOpacity style={styles.iconeBtn} onPress={() => navigation.navigate('Editar', { id: aluno.id })}>
                    <Text style={styles.iconeTexto}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconeBtn} onPress={() => navigation.navigate(`Excluir`, { id: aluno.id })}>
                    <Text style={styles.iconeTexto}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.botaoAdicionar} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.textoBotao}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 MyGrades</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#A2C8F2' },

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

  header: {
    height: 80,
    backgroundColor: '#2980b9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
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

  tableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  table: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    minWidth: '90%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#2980b9',
  },
  cell: {
    minWidth: 100,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#dfefff',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  emoteCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emote: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: '#2980b9',
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfefff',
    minWidth: 100,
    borderWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: 7.2,
  },
  iconeBtn: {
    marginHorizontal: 5,
  },
  iconeTexto: {
    fontSize: 18,
  },
  botaoAdicionar: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },

  footer: {
    backgroundColor: '#2980b9',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});
