import { create } from 'zustand';
import axios from 'axios';

// *** CORREÇÃO: Substitua esta URL pela URL da sua API no Render ***
const URL = "https://boletim-escolar-api.onrender.com";

export const useBoletim = create((set , get) => ({
    alunos:[],
    loading:false,
    error:null,
    atualAluno: null,

    formData: {
        nome:"",
        notamat:"",
        notaport:"",
        notahist:"",
        notamedia:"",
        url:""
    },

    setFormData: (formData) => set({formData}),
    resetForm: () => set({ formData: {nome: "", notamat:"", notaport:"", notahist:"", notamedia:"", url:"" }}),

    addAluno: async (e) => {
        e.preventDefault();
        set({loading:true});
        try {
            const {formData} = get();
            console.log("URL da requisição GET:", `${URL}/`);
            await axios.post(`${URL}/`, formData);
            await get().fetchAlunos();
            get().resetForm(); // Aqui o resetForm faz sentido para limpar o formulário de adição
            console.log("Aluno adicionado com sucesso");
        } catch (error) {
            console.error("Erro ao adicionar aluno:", error);
            // Poderia adicionar um set({ error: "Mensagem de erro" }); aqui
        }finally{
            set({loading:false})
        }
    },

    // GET todos os alunos
    fetchAlunos: async () => {
        set({loading:true});
        try {
            const response = await axios.get(`${URL}/`)
            set({alunos:response.data.data});
            set({error: null}); // Limpa erros anteriores ao buscar com sucesso
        } catch (error) {
            console.error("Erro ao buscar alunos:", error);
            if (error.response && error.response.status === 429) {
                set({error: "Limite de requests excedido. Tente novamente mais tarde."});
            } else {
                set({error: "Erro interno do servidor ao buscar alunos."});
            }
        }finally{
            set({loading:false})
        }
    },

    // GET aluno por ID
    fetchAlunoById: async (id) => {
        set({loading:true});
        try {
            const response = await axios.get(`${URL}/${id}`);
            // Ao buscar por ID, você preenche tanto 'atualAluno' quanto 'formData' para pré-popular o formulário de edição
            set({atualAluno: response.data.data, formData: response.data.data, error:null,});
        } catch (error) {
            console.error("Erro ao buscar aluno por ID:", error);
            set({error: "Erro ao buscar aluno. Verifique o ID."});
            set({atualAluno: null, formData: get().resetForm()}); // Limpa o atualAluno e o formData em caso de erro
        }finally{
            set({loading:false})
        }
    },

    // DELETE aluno
    deleteAluno: async (id) => {
        set({loading:true});
        try {
            await axios.delete(`${URL}/${id}`);
            // Filtra o aluno deletado da lista de alunos na store
            set(prev => ({ alunos: prev.alunos.filter(aluno => aluno.id !== id)}));
            console.log("Aluno deletado com sucesso");
        } catch (error) {
            console.error("Erro ao deletar aluno:", error);
            // Poderia adicionar um set({ error: "Mensagem de erro" }); aqui
        }finally{
            set({loading:false})
        }
    },

    // UPDATE aluno
    updateAluno: async (id, dadosDoAluno) => { // Aceita 'id' e 'dadosDoAluno'
        set({ loading: true });
        try {
            // Envia os dadosDoAluno diretamente para a API
            const response = await axios.put(`${URL}/${id}`, dadosDoAluno);

            // Atualiza o aluno atualmente selecionado na store com os dados retornados pela API
            set({ atualAluno: response.data.data });

            // Re-busca a lista completa de alunos para garantir que a UI reflita a mudança
            await get().fetchAlunos();

            // get.resetForm(); // <-- COMENTE OU REMOVA ESTA LINHA para que o formulário de edição não seja limpo pela store
                                        // A limpeza deve ser feita no componente `EditarNotas.js` se necessário.

            console.log("Aluno atualizado com sucesso:", response.data.data);
            return response.data.data; // Retorna os dados atualizados para o componente que chamou
        } catch (error) {
            console.error("Erro ao atualizar aluno:", error);
            // Relança o erro para que o componente React Native possa tratá-lo
            throw error;
        } finally {
            set({ loading: false });
        }
    },
}));