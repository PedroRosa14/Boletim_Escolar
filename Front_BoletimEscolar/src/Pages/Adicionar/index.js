// src/pages/adicionar/index.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Modal, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Adicionar({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [aluno, setAluno] = useState('');
  const [notas, setNotas] = useState(['', '', '']);
  const [media, setMedia] = useState('');
  const [url, setUrl] = useState(''); // <- novo estado

  const handleNotaChange = (text, index) => {
    const novasNotas = [...notas];
    novasNotas[index] = text;
    setNotas(novasNotas);
  };

  useEffect(() => {
    const numeros = notas.map(n => parseFloat(n)).filter(n => !isNaN(n));
    if (numeros.length === 3) {
      const mediaCalculada = (numeros.reduce((acc, val) => acc + val, 0) / 3).toFixed(2);
      setMedia(mediaCalculada);
    } else {
      setMedia('');
    }
  }, [notas]);

  return (
    <View style={styles.container}>
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={[styles.row, styles.headerRow]}>
              {['Nome', 'Matemática', 'Português', 'História', 'Média', 'URL do Aluno'].map((col, i) => (
                <View key={i} style={styles.cell}>
                  <Text style={styles.headerText}>{col}</Text>
                </View>
              ))}
            </View>

            <View style={styles.row}>
              <TextInput
                style={styles.inputCell}
                placeholder="Nome"
                value={aluno}
                onChangeText={setAluno}
              />
              {notas.map((nota, i) => (
                <TextInput
                  key={i}
                  style={styles.inputCell}
                  placeholder="Nota"
                  value={nota}
                  onChangeText={(text) => handleNotaChange(text, i)}
                  keyboardType="numeric"
                />
              ))}
              <TextInput
                style={[styles.inputCell, { backgroundColor: '#eee' }]}
                placeholder="Média"
                value={media}
                editable={false}
              />
              <TextInput
                style={styles.inputCell}
                placeholder="Url"
                value={url}
                onChangeText={setUrl}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.botaoAdicionar}>
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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

  botaoAdicionar: {
    backgroundColor: '#025602',
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
