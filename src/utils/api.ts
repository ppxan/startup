import Axios, { AxiosRequestConfig } from 'axios';
import { Form } from '../types';

const axios = Axios.create({
  baseURL: '/api',
});

export function getForm(id: string, config?: AxiosRequestConfig) {
  return axios.get<Form[]>(`/form/${id}`, config).then((res) => res.data[0]);
}

export function submitForm(id: string, data: any, config?: AxiosRequestConfig) {
  return axios
    .post<{ result: { ok: number } }>(`/submit/${id}`, data, config)
    .then((res) => res.data.result);
}

export function createForm(id: string, form: any, config?: AxiosRequestConfig) {
  return axios
    .post<{ result: { ok: number } }>(`/form/${id}`, form, config)
    .then((res) => res.data.result);
}
