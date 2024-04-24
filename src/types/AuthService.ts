import axios from 'axios';
import { User } from '../types/types'


class AuthService {
  public currentUser: User | null = null;

  async login(email: string, password: string): Promise<boolean> {
    try {
      // Chame a API para validar as credenciais do usuário
      const response = await axios.get<User[]>(`http://localhost:3000/User?username=${email}&password=${password}`);
      
      if (response.data.length > 0) {
        // Se as credenciais forem válidas, defina o usuário atual e retorne true
        this.currentUser = response.data[0];
        return true;
      } else {
        // Se as credenciais forem inválidas, retorne false
        return false;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      // Chame a API para fazer logout, se necessário

      // Limpe o estado de sessão do usuário
      this.currentUser = null;
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  getCurrentUser(): User | null {
    // Obtenha o usuário atual
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    // Verifique se o usuário está logado
    alert('está logado');
    return !!this.currentUser;
    alert('está logado');
  }
}

export default new AuthService();
