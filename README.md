🎓 Boletim Escolar

Um sistema completo para gerenciamento de notas e turmas escolares, com arquitetura full stack: front-end em React Native e back-end em Java (Spring Boot)/MySQL. Permite cadastrar alunos, professores, disciplinas e notas, além de consultar boletins escolares com interface moderna e intuitiva.

---

📚 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Arquitetura & Estrutura de Pastas](#arquitetura--estrutura-de-pastas)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Guia de Instalação (Passo a Passo)](#guia-de-instalação-passo-a-passo)
- [Como Usar](#como-usar)
- [Configuração de Ambiente](#configuração-de-ambiente)
- [Principais Endpoints da API](#principais-endpoints-da-api)
- [Fluxo de Desenvolvimento e Contribuição](#fluxo-de-desenvolvimento-e-contribuição)
- [Licença](#licença)
- [Contato](#contato)

---

## 📘 Sobre o Projeto

O sistema **Boletim Escolar** foi desenvolvido para auxiliar escolas e professores a gerenciarem alunos e notas de maneira centralizada e eficiente. Ele conta com uma API RESTful para manipulação dos dados e uma interface mobile amigável.

- **Front-end React Native**: Interface de fácil uso voltada para alunos e professores.
- **Back-end Java (Spring Boot)/MySQL**: API segura e escalável para controle dos dados escolares.

---

## 🗂️ Arquitetura & Estrutura de Pastas

Boletim_Escolar/
│
├── backend/ # API RESTful (Java, Spring Boot, MySQL)
│ ├── src/main/java/... # Código-fonte Java (controllers, services, models, etc.)
│ ├── src/main/resources/ # Configurações (application.properties)
│ ├── pom.xml # Dependências do projeto
│
├── frontend/ # Aplicativo em React Native
│ ├── src/
│ │ ├── components/ # Componentes reutilizáveis
│ │ ├── screens/ # Telas principais (Login, Home, Alunos, Notas, etc.)
│ │ ├── services/ # Conexão com a API
│ │ └── App.js # Componente principal
│ ├── package.json
│
├── README.md
└── LICENSE


---

## ✅ Funcionalidades

### Front-end

- Login de alunos e professores.
- Cadastro e listagem de alunos.
- Cadastro e listagem de notas por disciplina.
- Visualização de boletim por aluno.
- Design responsivo e navegação intuitiva.

### Back-end

- API estruturada com Spring Boot e MVC.
- CRUD completo de alunos, disciplinas e notas.
- Validação e autenticação (opcional).
- Conexão com banco de dados MySQL.

---

## 🛠 Tecnologias Utilizadas

### Front-end
- React Native
- JavaScript (ES6+)
- Axios
- React Navigation

### Back-end
- Java
- Spring Boot
- Spring Data JPA
- MySQL
- Maven

---

## 🧩 Guia de Instalação (Passo a Passo)

### 1. Clone o repositório
bash
git clone https://github.com/PedroRosa14/Boletim_Escolar.git
cd Boletim_Escolar
cd backend
* Configure o application.properties com as credenciais do MySQL
./mvnw spring-boot:run
spring.datasource.url=jdbc:mysql://localhost:3306/boletim_escolar
spring.datasource.username=root
spring.datasource.password=senha
server.port=8080
cd ../frontend
npm install
npm start

🚀 Como Usar
Acesse o app via emulador ou celular com Expo Go.

Faça login como professor ou aluno.

Gerencie alunos, disciplinas e notas.

Visualize o boletim atualizado de cada estudante.

⚙️ Configuração de Ambiente
Back-end: application.properties com dados do banco.

Front-end: .env com a URL da API (se aplicável).

📡 Principais Endpoints da API
GET    /alunos               - Lista todos os alunos
POST   /alunos               - Cria novo aluno
GET    /alunos/{id}          - Detalhes de um aluno
PUT    /alunos/{id}          - Atualiza aluno
DELETE /alunos/{id}          - Remove aluno

POST   /notas                - Cadastra nota
GET    /notas/boletim/{id}   - Boletim do aluno

🔃 Fluxo de Desenvolvimento e Contribuição
Faça um fork do projeto

Crie uma branch (git checkout -b feature/NovaFeature)

Commit suas alterações (git commit -m 'Adiciona NovaFeature')

Push para a branch (git push origin feature/NovaFeature)

Abra um Pull Request

📄 Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.

🔗 [Link da nossa API](https://boletim-escolar-api.onrender.com/)

📬 Contato
Pedro F -@PedroRosa14 Pedro
kauã - @Kaualuiz12
igor - @igolwb @_Ingoat
Elias -@EliasDeAlencar
