import { AxiosError, AxiosInstance } from 'axios';
import { AppConfig } from '../../config';
import { axiosInstance } from '../../api/http-common';
import { CreditUser } from '../interfaces/user.interface';

class UsersService {
  private baseUrl: string;
  private http: AxiosInstance;

  constructor() {
    this.baseUrl = `${ AppConfig().endpoints.api }/users`;
    this.http = axiosInstance;
  }

  async create(): Promise<string> {
    throw new Error('Method not implemented yet.')
  }

  async findAll(): Promise<CreditUser[]> {
    try {
      const { data } = await this.http<CreditUser[]>(this.baseUrl);
      return data;
    } catch (error) {
      console.warn(error);
      if (error instanceof AxiosError) throw new Error(error.message);
      else throw new Error('Unable to contact the API...');
    }
  }

  async update(): Promise<CreditUser> {
    throw new Error('Method not implemented yet.')
  }
  
  async delete(): Promise<string> {
    throw new Error('Method not implemented yet.')
  }
}

export const usersAPI = new UsersService();
