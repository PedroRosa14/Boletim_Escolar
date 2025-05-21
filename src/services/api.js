import { create } from 'zustand';
import axios from 'axios';

const URL = "http://localhost:3000";

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
    },

    setFormData: (formData) => set({formData}),
    resetForm: () => set({ formData: {nome: "", notamat:"", notaport:"", notahist:"", notamedia:""  }}),

    addAluno: async (e) => {
        e.preventDefault();
        set({loading:true});
        try {
            const {formData} = get();
            await axios.post(`${URL}/api/alunos`, formData,);
            await get().fetchAlunos();
            get.resetForm();
            console.log("Aluno adicionado com sucesso");
        } catch (error) {
            console.error("Erro ao adicionar aluno:", error);
        }finally{
            set({loading:false})
        }
    },

    //get
    fetchAlunos: async () => {
        set({loading:true});
        try {
            const response = await axios.get(`${URL}/api/alunos`)
            set({alunos:response.data.data});
        } catch (error) {
            if (error.status == 429) set({error: "limite de requests excedido"});
            else set({error: "erro interno do servidor"});
        }finally{
            set({loading:false})
        }
    },

    //get id
    fetchAlunoById: async (id) => {
        set({loading:true});
        try {
            const response = await axios.get(`${URL}/api/alunos/${id}`);
            set({atualAluno: response.data.data, formData: response.data.data, error:null,});
        } catch (error) {
            console.error("Erro ao buscar aluno:", error);
            set({error: "Erro ao buscar aluno", atualAluno: null});
        }finally{
            set({loading:false})
        }
    },

    //delete
    deleteAluno: async (id) => {
        set({loading:true});
        try {
            await axios.delete(`${URL}/api/alunos/${id}`);
            set(prev => ({ alunos: prev.alunos.filter(aluno => aluno.id !== id)}));
            console.log("Aluno deletado com sucesso");
        } catch (error) {
            console.error("Erro ao deletar aluno:", error);
        }finally{
            set({loading:false})
        }
    },

    updateAluno: async (id) => {
        set({loading:true});
        try {
            const {formData} = get();
            const response = await axios.put(`${URL}/api/alunos/${id}`, formData);
            set({atualAluno: response.data.data});
            await get().fetchAlunos();
            get.resetForm();
            console.log("Aluno atualizado com sucesso");
        } catch (error) {
            console.error("Erro ao atualizar aluno:", error);
        }finally{
            set({loading:false})
        }
    },
}));