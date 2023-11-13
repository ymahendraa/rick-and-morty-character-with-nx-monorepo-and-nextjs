import { AxiosError } from 'axios';

export type TError = {
  error: string;
};

export type TErrorResponse = AxiosError<TError>;
