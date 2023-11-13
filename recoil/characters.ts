import { TCharacter, TDetailCharacter } from '../types/characters';
import { atom } from 'recoil';

export const charactersState = atom<TCharacter>({
  key: 'charactersState',
  default: {
    info: {
      count: 0,
      pages: 0,
      next: '',
      prev: '',
    },
    results: [],
  },
});

export const detailCharacterState = atom<TDetailCharacter>({
  key: 'detailCharacterState',
  default: {
    id: 0,
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
      name: '',
      url: '',
    },

    location: {
      name: '',
      url: '',
    },
    image: '',
    episode: [],
    url: '',
    created: '',
  },
});

export const characterPageState = atom<number>({
  key: 'characterCurrentPageState',
  default: 1,
});
