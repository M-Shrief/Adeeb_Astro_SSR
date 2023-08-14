import { string } from 'yup';

export const nameRules = string().required().min(2).max(50).trim();
export const addressRules = string().required().min(8).max(100).trim();
export const phoneRules = string().required().min(6).max(50).trim();
export const passwordRules = string().required().min(8).max(50).trim();
