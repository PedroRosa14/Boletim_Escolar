import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Modal, Image, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useBoletim } from '../../services/api.js';  // Importando a store Zustand

export default function ExcluirNotas({ navigation, route }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const id = route.params?.id;

  // Puxando funções e dados da store Zustand
  const fetchAlunoById = useBoletim(state => state.fetchAlunoById);
  const deleteAluno = useBoletim(state => state.deleteAluno);
  const atualAluno = useBoletim(state => state.atualAluno);

  const [media, setMedia] = useState('');

  // Quando o id mudar, busca o aluno
  useEffect(() => {
    if (id) {
      fetchAlunoById(id);
    }
  }, [id]);

// No useEffect que calcula a média:
useEffect(() => {
  if (atualAluno) {
    const notas = [
      parseFloat(atualAluno.notamat),
      parseFloat(atualAluno.notaport),
      parseFloat(atualAluno.notahist)
    ].filter(n => !isNaN(n));

    if (notas.length === 3) {
      const mediaCalculada = (notas.reduce((acc, val) => acc + val, 0) / 3).toFixed(2);
      setMedia(mediaCalculada);
    } else {
      setMedia('');
    }
  }
}, [atualAluno]);


  // Função para excluir
  const handleExcluir = async () => {
    if (!id) return Alert.alert('Erro', 'ID do aluno não encontrado.');

    try {
      await deleteAluno(id);
      Alert.alert('Sucesso', 'Aluno excluído com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir o aluno.');
      console.error(error);
    }
  };

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

      {/* Tabela + Botões dentro do ScrollView */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={[styles.row, styles.headerRow]}>
              {['Nome', 'Matemática', 'Português', 'História', 'Média', ].map((col, i) => (
                <View key={i} style={styles.cell}>
                  <Text style={styles.headerText}>{col}</Text>
                </View>
              ))}
            </View>

            <View style={styles.row}>


            <TextInput
  style={styles.inputCell}
  placeholder="Nome"
  value={atualAluno?.nome || ''}
  editable={false}
/>

<TextInput
  style={styles.inputCell}
  placeholder="Matemática"
  value={String(atualAluno?.notamat ?? '')}
  editable={false}
  keyboardType="numeric"
/>
<TextInput
  style={styles.inputCell}
  placeholder="Português"
  value={String(atualAluno?.notaport ?? '')}
  editable={false}
  keyboardType="numeric"
/>
<TextInput
  style={styles.inputCell}
  placeholder="História"
  value={String(atualAluno?.notahist ?? '')}
  editable={false}
  keyboardType="numeric"
/>

          
            </View>
          </View>

          <View style={styles.botoesContainer}>
            <TouchableOpacity style={styles.botaoExcluir} onPress={handleExcluir}>
              <Text style={styles.textoBotao}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 MyGrades</Text>
      </View>
    </View>
  );
}

// ...seus estilos permanecem os mesmos


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
  },
  headerRow: {
    backgroundColor: '#2980b9',
  },
  cell: {
    minWidth: 150,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputCell: {
    minWidth: 150,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    textAlign: 'center',
    backgroundColor: '#fff',
  },

  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20,
    marginBottom: 40,
  },
  botaoExcluir: {
    backgroundColor: '#f10b0b',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  botaoCancelar: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
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
