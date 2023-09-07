import { GameData } from '../models/GameModel';
import { User, UserInfo } from '../models/UserModel.ts';
import axios from 'axios';
import { SpinResultModel } from '../models/SpinResultModel.ts';

export const BASE_URL = 'https://konan-gaming-full-stack-back.vercel.app';
console.log('meta', import.meta.env.VITE_BACK_URL);
console.log('process', process.env.VITE_BACK_URL);
const instance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Access-Control-Allow-Origin': BASE_URL },
});

export const registration = async (
  data: Pick<User, 'login' | 'email' | 'password'>,
) => {
  try {
    const response = await instance.post(`/auth/registration`, data, {
      withCredentials: true,
    });
    return await response.data;
  } catch (e) {
    console.error(e);
    throw e as Error;
  }
};

export const login = async (data: {
  loginOrEmail: string;
  password: string;
}) => {
  try {
    const response = await instance.post(`/login`, data, {
      withCredentials: true,
    });

    return await response.data;
  } catch (e) {
    console.error(e);
    throw e as Error;
  }
};

export const getUserinfo = async () => {
  try {
    const response = await instance.get(`/login/me`, {
      withCredentials: true,
    });
    return (await response.data) as Promise<UserInfo>;
  } catch (e) {
    console.error(e);
    throw e as Error;
  }
};

export const getGamaData = async (query = '') => {
  try {
    const response = await instance.get(`/send`, {
      params: { title: query },
    });
    return (await response.data) as Promise<GameData>;
  } catch (e) {
    console.error(e);
    throw e as Error;
  }
};

export const spinSlotMachine = async () => {
  try {
    const response = await instance.post(
      `/slot-machine/spin`,
      {},
      {
        withCredentials: true,
      },
    );
    return (await response.data) as Promise<SpinResultModel>;
  } catch (e) {
    console.error(e);
    throw e as Error;
  }
};
