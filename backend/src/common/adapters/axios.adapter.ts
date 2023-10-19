import { Injectable } from '@nestjs/common';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private instance: AxiosInstance = axios;

  async get<T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> {
    try {
      const { data } = await this.instance.get<T>(url, config);
      return data;
    } catch (error) {
      console.warn(error);
      throw new Error('Error on the AxiosAdapter, check the logs...')
    }
  }
}
