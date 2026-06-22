import type {AxiosInstance} from 'axios';
import axios from 'axios';
import {REQUEST_TIMEOUT} from './config';

const {VITE_API_URL} = import.meta.env;

const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: VITE_API_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};

export const httpApi = createApi();
