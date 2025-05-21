import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Modal, Image, Alert
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useBoletim } from '../../services/api.js'; // seu hook que chama a API

export default function Editar() {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};

  const [menuVisible, setMenuVisible] = useState(false);
  const [nome, setNome] = useState('');
  const [notamat, setNotaMat] = useState('');
  const [notaport, setNotaPort] = useState('');
  const [notahist, setNotaHist] = useState('');

  const { atualAluno, fetchAlunoById, loading, error, updateFormData, updateAluno } = useBoletim();

  // Busca aluno ao carregar a tela
  useEffect(() => {
    if (id) {
      fetchAlunoById(id);
    }
  }, [id]);

  // Preenche campos ao mudar o aluno atual
  useEffect(() => {
    if (atualAluno) {
      setNome(atualAluno.nome || '');
      setNotaMat(String(atualAluno.notamat ?? ''));
      setNotaPort(String(atualAluno.notaport ?? ''));
      setNotaHist(String(atualAluno.notahist ?? ''));
    }
  }, [atualAluno]);

  const calcularMedia = () => {
    const m = (parseFloat(notamat) + parseFloat(notaport) + parseFloat(notahist)) / 3;
    return isNaN(m) ? '' : m.toFixed(2);
  };

  const handleEditar = async () => {
    if (!nome || !notamat || !notaport || !notahist) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    const novoAluno = {
      nome,
      notamat: parseFloat(notamat),
      notaport: parseFloat(notaport),
      notahist: parseFloat(notahist),
    };

    try {
      await updateFormData(novoAluno);
      await updateAluno(id);

      Alert.alert('Dados atualizados com sucesso!');
      navigation.goBack();

    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      Alert.alert('Erro ao salvar alterações');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={{fontSize: 18, color: '#333'}}>Carregando dados do aluno...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, {justifyContent: 'center', alignItems: 'center'}]}>
        <Text style={{fontSize: 18, color: 'red'}}>{error}</Text>
      </View>
    );
  }

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

      {/* Tabela de edição */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={[styles.row, styles.headerRow]}>
              {['Nome', 'Matemática', 'Português', 'História', 'Média'].map((col, i) => (
                <View key={i} style={styles.cell}>
                  <Text style={styles.headerText}>{col}</Text>
                </View>
              ))}
            </View>

            <View style={styles.row}>
              <TextInput
                style={styles.inputCell}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
              />
              <TextInput
                style={styles.inputCell}
                placeholder="Matemática"
                value={notamat}
                onChangeText={setNotaMat}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.inputCell}
                placeholder="Português"
                value={notaport}
                onChangeText={setNotaPort}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.inputCell}
                placeholder="História"
                value={notahist}
                onChangeText={setNotaHist}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.inputCell, { backgroundColor: '#eee' }]}
                placeholder="Média"
                value={calcularMedia()}
                editable={false}
              />
            </View>
          </View>

          {/* Botões Editar e Cancelar */}
          <View style={styles.botoesContainer}>
            <TouchableOpacity style={styles.botaoEditar} onPress={handleEditar}>
              <Text style={styles.textoBotao}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.goBack()}>
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
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
  botaoEditar: {
    backgroundColor: '#e3ea1e',
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
