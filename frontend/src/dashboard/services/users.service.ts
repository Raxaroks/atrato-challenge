import { AxiosError, AxiosInstance } from 'axios';
import { AppConfig } from '../../config';
import { axiosInstance } from '../../api/http-common';
import { CreditUser, OnlyUser } from '../interfaces/user.interface';

export interface HttpResponse {
  statusCode: number;
  message: string;
}

type UpdateUserResponse = HttpResponse & { user: CreditUser };

class UsersService {
  private baseUrl: string;
  private http: AxiosInstance;

  constructor() {
    console.log( AppConfig() );
    this.baseUrl = `${ AppConfig().endpoints.api }/users`;
    this.http = axiosInstance;
  }

  async create(body: OnlyUser): Promise<string> {
    try {
      const { data } =  await this.http.post<string>(this.baseUrl, body);
      return data;
    } catch (error) {
      console.warn(error);
      if (error instanceof AxiosError) throw new Error(error.message);
      else throw new Error('Unable to contact the API...');
    }
  }

  async findAll(): Promise<CreditUser[]> {
    try {
      const { data } = await this.http.get<CreditUser[]>(this.baseUrl);
      return data;
    } catch (error) {
      console.warn(error);
      if (error instanceof AxiosError) throw new Error(error.message);
      else throw new Error('Unable to contact the API...');
    }
  }

  async update(id: string, body: OnlyUser): Promise<CreditUser> {
    try {
      const url = `${this.baseUrl}/${id}`
      const { data } = await this.http.patch<UpdateUserResponse>(url, body);
      return data.user;
    } catch (error) {
      console.warn(error);
      if (error instanceof AxiosError) throw new Error(error.message);
      else throw new Error('Unable to contact the API...');
    }   
  }
  
  async delete(id: string): Promise<void> {
    try {
      const url = `${this.baseUrl}/${ id }`;
      await this.http.delete(url);
    } catch (error) {
      console.warn(error);
      if (error instanceof AxiosError) throw new Error(error.message);
      else throw new Error('Unable to contact the API...');
    }
    
  }
}

export const usersAPI = new UsersService();
