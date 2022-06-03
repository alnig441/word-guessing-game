import { writable, readable, derived   } from 'svelte/store';
import { localStore } from './localStore';

export const  nextSentenceAsPromise = localStore('nextSentence'),
              sentencesAsPromise = writable([]),
              correctSentenceAsPromise = derived([sentencesAsPromise, nextSentenceAsPromise], (value) => {
                return (value[0][value[1]])
              })
