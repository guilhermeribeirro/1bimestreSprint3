import axios, { AxiosResponse } from 'axios';
import { User } from '../types/types';




const BASE_URL = 'http://localhost:3000/User/';

class UserService {

    constructor() {
        // Se necessário, adicione inicializações aqui
      }

      async addUser(user: User): Promise<boolean> {
    try {
      const response = await axios.post(`${BASE_URL}`, user);
      return response.status === 201; // Retorna true se o usuário foi adicionado com sucesso
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }

  async validateUser(username: string, password: string): Promise<boolean> {
    try {
        const response: AxiosResponse<User[]> = await axios.get(`${BASE_URL}?username=${username}&password=${password}`);
        //na aplicação de vocês não retorna array não e o metodo sera um post que retorna um unico usuario.
        if (response.data.length === 0) {
          return false;
        }
  
        return response.status === 200; 
    } catch (error) {
      console.error('Erro ao validar usuário:', error);
      return false; // Retorna false em caso de erro
    }
  }
}

export default  UserService;