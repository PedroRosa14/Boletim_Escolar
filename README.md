# 🎓 Boletim Escolar

Aplicativo mobile para **cadastro, consulta, edição e exclusão** de alunos e suas notas escolares.

---

## 📘 Sobre o Projeto

O **Boletim Escolar** é um app mobile desenvolvido com **React Native (Expo)** no frontend e **Node.js + PostgreSQL** no backend.  
Ele permite gerenciar alunos, cadastrar notas, calcular médias e exibir emojis de avaliação de forma intuitiva.

---

## ✅ Funcionalidades

- Cadastro de alunos com:
  - Nome
  - Foto (URL)
  - Notas de Matemática, Português e História
  - Cálculo automático da média
  - Emoji de satisfação baseado no desempenho
- Listagem de todos os alunos cadastrados
- Visualização completa do perfil do aluno
- Edição e exclusão de registros
- Interface amigável e responsiva

---

## 🛠 Tecnologias Utilizadas

### 🔹 Frontend (React Native com Expo)

- [React Native (Expo)](https://expo.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Axios](https://axios-http.com/)
- [React Navigation](https://reactnavigation.org/)

### 🔸 Backend (Node.js + PostgreSQL)

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL (Neon Database)](https://neon.tech/)
- [@neondatabase/serverless](https://www.npmjs.com/package/@neondatabase/serverless)
- [Helmet](https://helmetjs.github.io/)
- [Morgan](https://www.npmjs.com/package/morgan)

---

## 🚀 Instalação e Execução

### ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado globalmente
- Conta no [Neon Database](https://neon.tech/) para o banco de dados

---
## 📂 Estrutura de Pastas

<pre>
Boletim_Escolar
│
├── backend/                                # Código do backend (Node.js + Express + PostgreSQL)
│   ├── config/                             # Configurações de banco de dados
│   │   └── db.js
│   ├── controller/                         # Lógica dos controladores
│   │   └── alunoController.js
│   ├── routes/                             # Definição de rotas da API
│   │   └── alunoRoutes.js
│   ├── src/
│   │   └── server.js                       # Inicialização do servidor
│   ├── package.json                        # Dependências do Node.js
│   ├── package-lock.json                   # Lockfile do NPM
│   └── README.md                           # Documentação do backend
│
├── Front_BoletimEscolar/                   # Aplicativo mobile (React Native com Expo)
│   ├── .expo/                              # Arquivos de cache do Expo
│   ├── assets/                             # Imagens, ícones e fontes
│   ├── node_modules/                       # Módulos instalados pelo NPM
│   ├── src/
│   │   ├── Pages/                          # Telas da aplicação
│   │   │   ├── Adicionar/
│   │   │   ├── Editar/
│   │   │   ├── Excluir/
│   │   │   ├── Ler/
│   │   │   └── Perfil/
│   │   ├── routes/
│   │   │   └── AppNavigator.js             # Navegação entre as páginas
│   │   ├── services/                       # Comunicação com a API backend
│   │   └── App.js                          # Componente principal da aplicação
│   ├── app.json                            # Configuração do projeto Expo
│   ├── index.js                            # Ponto de entrada do app
│   ├── package.json                        # Dependências do projeto React Native
│   ├── package-lock.json                   # Lockfile do NPM
│   └── README.md                           # Documentação do frontend
│
├── docs/                                   # Documentação adicional do projeto

</pre>

--

## 📱 Frontend

### Acesse a pasta do frontend
- cd Front_BoletimEscolar

### Instale as dependências
- npm install

### Inicie o aplicativo
- npx expo start --tunnel

Utilize o aplicativo no emulador ou no seu dispositivo móvel através do Expo Go.

## 📸 Demonstração do Projeto

<p align="center">
  <img src="https://github.com/user-attachments/assets/f59747b7-5f69-4d5e-ad4b-a8189e8eb07e" width="200" height= "200" alt="Tabela de Alunos" >
   <img src="https://github.com/user-attachments/assets/8433666e-dae1-4b72-93ca-1f9cbd70406d" width="200" height= "200"  alt="Perfil do Aluno" >
  <img src="https://github.com/user-attachments/assets/16c14046-c529-4253-bfb2-28a6279e7771" width="200" height= "200" alt="Tabela de Salvar" >
  <img src="https://github.com/user-attachments/assets/570f6c0b-c82c-493c-be63-af4c6d044e45" width="200" height= "200" alt="Tabela de Excluir" > 
</p>

<p align="center">
  <em>Interface com Tabela Inicial, Perfil do Aluno,  Tabela de Salvar Notas e Tabela de Excluir Notas</em>
</p>


🔗 [Link da nossa API](https://boletim-escolar-api.onrender.com/)

🔗 [Link da nossa Documentação](https://boletim-escolar-api.onrender.com/api-docs/)

📬 Contato
Pedro F -@PedroRosa14 Pedro
kauã - @Kaualuiz12
igor - @igolwb @_Ingoat
Elias -@EliasDeAlencar
