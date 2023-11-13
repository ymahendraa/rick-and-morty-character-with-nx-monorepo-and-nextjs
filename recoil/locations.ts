import { TLocations } from '../types/location';
import { atom } from 'recoil';

export const locationsState = atom({
  key: 'locationsState',
  default: {
    data: [] as TLocations['data'],
  },
});

export const locationNameState = atom({
  key: '',
  default: [] as string[],
});

//
