import { create } from 'zustand';
import axios from 'axios';

const URL = "http://localhost:3000";

export const useBoletim = create((set , get) => ({
    alunos:[],
    loading:false,
    error:null,

    fetchAlunos: async () => {
        set({loading:true});
        try {
            const response = await axios.get(`${URL}/api/alunos`)
            set({alunos:resonse.data.data});
        } catch (error) {
            if (error.status == 429) set({error: "limite de requests excedido"})
        }finally{
            set({loading:false})
        }
    }
}));