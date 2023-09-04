import axios from 'axios';
import { LoginData, User } from '../models/UserModel';
import { GameData } from '../models/GameModel';

const BASE_URL =
  'https://konan-gaming-full-stack-back-3fpvm4m4y-furiousgopher.vercel.app';

export const registration = async (
  data: Pick<User, 'login' | 'email' | 'password'>,
) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/registration`, data);
    return (await response.data) as Promise<User>;
  } catch (e) {
    console.error(e);
    return e as Error;
  }
};

export const login = async (data: LoginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);
    return (await response.data) as Promise<User>;
  } catch (e) {
    console.error(e);
    return e as Error;
  }
};

export const getGamaData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/send`);
    return (await response.data) as Promise<GameData>;
  } catch (e) {
    console.error(e);
    return e as Error;
  }
};

export const getGamaDataBySearch = async (title: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/send?title=${title}`);
    return (await response.data) as Promise<GameData>;
  } catch (e) {
    console.error(e);
    return e as Error;
  }
};

export const getThumbnailsDefault = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/thumbnails/default`);
    return await response.data;
  } catch (e) {
    console.error(e);
    return e as Error;
  }
};

export const spinSlotMachine = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/slot-machine/spin`);
    return await response.data;
  } catch (e) {
    console.error(e);
    return e as Error;
  }
};
