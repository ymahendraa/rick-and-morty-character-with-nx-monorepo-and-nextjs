import axios, { AxiosRequestConfig } from 'axios';

const apiConfig: AxiosRequestConfig = {
  baseURL: 'https://rickandmortyapi.com/api/',
  // baseURL: process.env.NX_API_URL,
};

export const api = axios.create(apiConfig);
