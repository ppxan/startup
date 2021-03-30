import Axios, { AxiosRequestConfig } from 'axios';
import { Form } from '../types';

const axios = Axios.create({
  baseURL: '/api',
});

export function getForm(id: string, config?: AxiosRequestConfig) {
  return axios.get<Form[]>(`/form/${id}`, config).then((res) => res.data[0]);
}
