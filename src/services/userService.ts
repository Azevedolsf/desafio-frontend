import axios from 'axios';
import type { User } from '../types.d';

const API_BASE = 'http://localhost:3004';

export class UserService {
  private static async request(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, data?: Partial<User>) {
    try {
      const config = { method, url, ...(data && { data }) };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(`Erro no ${method}:`, error);
      throw error;
    }
  }

  static async getUsers() {
    return this.request('GET', `${API_BASE}/users`);
  }

  static async createUser(userData: Partial<User>) {
    return this.request('POST', `${API_BASE}/users`, userData);
  }

  static async updateUser(id: string, userData: Partial<User>) {
    return this.request('PUT', `${API_BASE}/users/${id}`, userData);
  }

  static async deleteUser(id: string) {
    return this.request('DELETE', `${API_BASE}/users/${id}`);
  }
}
