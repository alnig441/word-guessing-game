import { writable } from 'svelte/store';

export const localStore = (key, value) => {

  const exists = localStorage.getItem(key);

  if(!exists) {
    localStorage.setItem(key, value);
  }



  const {subscribe, set, update} = writable(exists);

  return {
    subscribe,
    set: (value) => {
      localStorage.setItem(key, value);
      return set(value);
    },
    update
  };
}
