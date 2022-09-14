import axios, { AxiosRequestConfig } from 'axios';
import { CreateUserParams, UserCredentialsParams } from './types';

const config: AxiosRequestConfig = {
  withCredentials: true,
}

export const postRegisterUser = async (data: CreateUserParams) => axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data, config);
export const postloginUser = async (data: UserCredentialsParams) => axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data, config);
export const getLoggedInUser = async (controller?: AbortController) => axios.get(`${process.env.REACT_APP_API_URL}/auth/status`, { ...config, signal: controller?.signal });