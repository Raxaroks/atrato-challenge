import axios from 'axios';
import { AppConfig } from '../config';

export const axiosInstance = axios.create({
  baseURL: AppConfig().endpoints.api,
  headers: { "Content-Type": "application/json" }
});
