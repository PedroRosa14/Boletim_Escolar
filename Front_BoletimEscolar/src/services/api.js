import { create } from 'zustand';
import axios from 'axios';

const URL = "http://localhost:3000";

export const useBoletim = create((set , get) => ({
    alunos:[],
    loading:false,
    error:null,

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

    //delete
    deleteAluno: async (id) => {
        set({loading:true});
        try {
            await axios.delete(`${URL}/api/alunos/2`);
            set(prev => ({ alunos: prev.alunos.filter(aluno => aluno.id !== id)}));
            console.log("Aluno deletado com sucesso");
        } catch (error) {
            console.error("Erro ao deletar aluno:", error);
        }finally{
            set({loading:false})
        }
    },
}));