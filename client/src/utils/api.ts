import axios, { AxiosRequestConfig } from 'axios';
import { Conversation, CreateConversationParams, CreateMessageParams, CreateUserParams, GetMessagesResponse, UserCredentialsParams } from './types';

const config: AxiosRequestConfig = {
  withCredentials: true,
}

export const postRegisterUser = async (data: CreateUserParams) => axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data, config);
export const postloginUser = async (data: UserCredentialsParams) => axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data, config);
export const getLoggedInUser = async (controller?: AbortController) => axios.get(`${process.env.REACT_APP_API_URL}/auth/status`, { ...config, signal: controller?.signal });
export const getConversations = async (controller?: AbortController) => axios.get<Conversation[]>(`${process.env.REACT_APP_API_URL}/conversations`, { ...config, signal: controller?.signal });
export const getConversationMessages = async (conversationId: number, controller?: AbortController) => axios.get<GetMessagesResponse>(`${process.env.REACT_APP_API_URL}/messages/${conversationId}`, { ...config, signal: controller?.signal });
export const postNewMessage = async (data: CreateMessageParams) => axios.post(`${process.env.REACT_APP_API_URL}/messages`, data, config);
export const postNewConversation = async (data: CreateConversationParams) => axios.post<Conversation>(`${process.env.REACT_APP_API_URL}/conversations`, data, config);