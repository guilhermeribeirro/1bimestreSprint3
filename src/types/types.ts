import { ImageSourcePropType } from 'react-native';
import axios from 'axios';


export interface User {
    id: number;
    username: string;
    password: string;
    photo: string;
    name:string;
    idUsuario: number;
  }



  
  export interface Grupo {
    id: number; 
    nome: string;
    quantidadeParticipantes: string;
    valor: string;
    dataRevelacao: string;
    photo: string;
    senhaUsuario: string;
    descricao: string;
    idUsuario: number;
  }
  



  
  