import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Modal, Image, Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useBoletim } from '../../services/api.js';  // sua store Zustand

export default function EditarNotas({ navigation, route }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const id = route.params?.id;

  // Funções da store
  const fetchAlunoById = useBoletim(state => state.fetchAlunoById);
  const updateAluno = useBoletim(state => state.updateAluno);
  const atualAluno = useBoletim(state => state.atualAluno);

  // Estados locais para edição
  const [nome, setNome] = useState('');
  const [notamat, setNotamat] = useState('');
  const [notaport, setNotaport] = useState('');
  const [notahist, setNotahist] = useState('');
    const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Puxar aluno ao abrir a tela
  useEffect(() => {
    if (id) {
      fetchAlunoById(id);
    }
  }, [id]);

  // Quando atualAluno mudar, preenche os campos
  useEffect(() => {
    if (atualAluno) {
      setNome(atualAluno.nome || '');
      setNotamat(String(atualAluno.notamat ?? ''));
      setNotaport(String(atualAluno.notaport ?? ''));
      setNotahist(String(atualAluno.notahist ?? ''));
      setUrl(String(atualAluno.url ?? ''));
    }
  }, [atualAluno]);

  // Função para calcular média
  const calcularMedia = () => {
    const notas = [
      parseFloat(notamat),
      parseFloat(notaport),
      parseFloat(notahist),
    ].filter(n => !isNaN(n));

    if (notas.length === 3) {
      return (notas.reduce((acc, val) => acc + val, 0) / 3).toFixed(2);
    }
    return '';
  };

  const handleSalvar = async () => {
        if (!nome.trim() || !notamat || !notaport || !notahist  || !url.trim()) {
          return Alert.alert('Atenção', 'Preencha todos os campos');
        }
    
        setLoading(true);
    
        const novoAluno = {
          nome: nome.trim(),
          notamat: parseFloat(notamat),
          notaport: parseFloat(notaport),
          notahist: parseFloat(notahist),
          url: url.trim(),
          notamedia: parseFloat(calcularMedia()),
        };
    
        try {
          // Corrigir aqui: Passe o id e os dados do aluno para a função updateAluno
          await updateAluno(id, novoAluno); 
          Alert.alert('Sucesso', 'Aluno atualizado com sucesso!');
          navigation.goBack();
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível atualizar o aluno.');
          console.error(error);
        } finally {
          setLoading(false);
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

      {/* Conteúdo com inputs e botões */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={[styles.row, styles.headerRow]}>
              {['Nome', 'Matemática', 'Português', 'História','URL' ,'Média'].map((col, i) => (
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
                onChangeText={setNotamat}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.inputCell}
                placeholder="Português"
                value={notaport}
                onChangeText={setNotaport}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.inputCell}
                placeholder="História"
                value={notahist}
                onChangeText={setNotahist}
                keyboardType="numeric"
              />

              <TextInput
                style={styles.inputCell}
                placeholder="URL da imagem"
                value={url}
                onChangeText={setUrl}
              />

              <View style={[styles.inputCell, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>{calcularMedia()}</Text>
              </View>
            </View>
          </View>

          <View style={styles.botoesContainer}>
            <TouchableOpacity
              style={[styles.botaoSalvar, loading && { backgroundColor: '#888' }]}
              onPress={handleSalvar}
              disabled={loading}
            >
              <Text style={styles.textoBotao}>{loading ? 'Salvando...' : 'Salvar'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={() => navigation.goBack()}
            >
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

// Reaproveite os estilos da tela ExcluirNotas, com só uma adição para o botão salvar:

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
    borderRightWidth: 1,
    borderRightColor: '#fff',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputCell: {
    minWidth: 150,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#2980b9',
    textAlign: 'center',
    fontSize: 16,
  },

  botoesContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  botaoSalvar: {
    backgroundColor: '#2980b9',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  botaoCancelar: {
    backgroundColor: '#bbb',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 6,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },

  footer: {
    backgroundColor: '#2980b9',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
  },
});
