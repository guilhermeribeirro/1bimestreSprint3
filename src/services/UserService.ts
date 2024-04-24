import axios, { AxiosResponse } from 'axios';
import { Grupo, User } from '../types/types';






const BASE_URL = 'http://localhost:3000/User';//'https://localhost:7217/api/User/'
const apiUrl = 'http://localhost:3000/Grupo';

class UserService {

    constructor() {
        // Se necessário, adicione inicializações aqui
      }

      async createGroup(groupData:Grupo): Promise<boolean>{
        try {
          // Enviar solicitação para a API usando axios
          const response = await axios.post(`${apiUrl}`, groupData);
    
          // Verificar se a solicitação foi bem-sucedida
          if (response.status === 200) {
            // Retorna true para indicar sucesso
            return true;
          } else {
            // Retorna false se houver algum problema na criação do grupo
            return false;
          }
        } catch (error) {
          // Trata erros de requisição, como conexão perdida ou erro no servidor
          console.error('Erro ao criar grupo:', error);
          // Retorna false em caso de erro
          return false;
        }
      }


       async registerUser(user: User): Promise<boolean> {
        try {
            const response = await axios.post(`${BASE_URL}`, user);
            return response.status === 201; // Retorna true se o usuário foi adicionado com sucesso
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            return false; // Retorna false em caso de erro
        }
    }


  async addUser(user: User): Promise<boolean> {
    try {
   const response = await axios.post(`${BASE_URL}`, user);
    
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('password', user.password);
    formData.append('name', user.name);
    //formData.append('photo', blob, 'photo.jpg');
    //const blob = await responsePhoto.blob();
    //formData.append('photo', blob, 'photo.jpg');

    const uploadResponse = await axios.post(BASE_URL+'addUser', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    
      return uploadResponse.status === 201; // Retorna true se o usuário foi adicionado com sucesso
    
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    try {
        const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}?username=${username}&password=${password}`);
        
        if (response.data.length === 0) {
          return false;
        }
  
        return response.status === 200; 
    } catch (error) {
      console.error('Erro ao validar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async getUserById(userId: number): Promise<User> {
    try {
        const response: AxiosResponse<User> = await axios.get(`${BASE_URL}?id=${userId}`);             
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar usuário pelo ID:', error);
        return { id: 0, username: '', password: '', name: '', photo: '', idUsuario:0 } ;
    }

}

  async getAllUsers(): Promise<User[] | null> {
    try {
      const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}`);
      return response.data;
      
    } catch (error) {
        console.error('Erro ao buscar usuário pelo ID:', error);
        return null;
    }


  }
  async getGruposDoUsuario(userId: number): Promise<Grupo[]> {
    try {
      // Faça uma requisição para sua API para obter os grupos do usuário com o ID fornecido
      const response = await axios.get(`http://localhost:3000/Grupo?id=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter grupos do usuário:', error);
      throw new Error('Erro ao obter grupos do usuário.');
    }
  }




}

export default  UserService;

