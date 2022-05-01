import { writable } from 'svelte/store';

export const  correctSentenceAsPromise = writable(''),
              scrambledSentenceAsPromise = writable(''),
              scoreAsPromise = writable(0)
