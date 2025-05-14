//src/pages/ler/index.js
import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal,
} from 'react-native';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const alunos = [
  { nome: 'Pedro', notas: [10, 5, 9], media: 5 },
  { nome: 'Marcia', notas: [9, 6, 3], media: 6 },
  { nome: 'Nicolas', notas: [7, 7, 4], media: 6 },
  { nome: 'Roberto', notas: [4, 6, 10], media: 8 },
  { nome: 'Leticia', notas: [7, 9, 5], media: 5 },
];

export default function TabelaNotas({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

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

      {/* Tabela */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableContainer}>
          <View style={styles.table}>
            <View style={[styles.row, styles.headerRow]}>
              {['Nome', 'Matemática', 'Português', 'História', 'Média', 'Ações'].map((col, i) => (
                <Text key={i} style={[styles.cell, styles.headerText]}>{col}</Text>
              ))}
            </View>
            {alunos.map((aluno, i) => (
              <View key={i} style={styles.row}>
                <Text style={styles.cell}>{aluno.nome}</Text>
                {aluno.notas.map((nota, j) => (
                  <Text key={j} style={styles.cell}>{nota}</Text>
                ))}
                <Text style={styles.cell}>{aluno.media}</Text>
                <View style={styles.acoes}>
                  <TouchableOpacity style={styles.iconeBtn}>
                    <Text style={styles.iconeTexto}>✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconeBtn}>
                    <Text style={styles.iconeTexto}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          {/* Botão Adicionar fora da tabela, mas ainda dentro da área da tabela */}
          <TouchableOpacity style={styles.botaoAdicionar} onPress={() => navigation.navigate('Cadastro')} >
            <Text style={styles.textoBotao}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer simplificado */}
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
    marginTop: -20, // Ajuste para encaixar bem visualmente
  },
  
  menuIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  
  header: {
    height: 80, // aumente para acomodar o logo
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
    justifyContent: 'center', // Centraliza a tabela
    alignItems: 'center', // Alinha a tabela no centro horizontalmente
    marginBottom: 20, // Ajuste o espaço entre a tabela e o botão
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
    marginTop: 20, // Menos espaço entre a tabela e o botão
    marginBottom: 40, // Menos espaço entre o botão e o footer
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },

  // Footer simplificado
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
