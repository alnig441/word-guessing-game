import { writable } from 'svelte/store';
import { localStore } from './localStore';

export const  correctSentenceAsPromise = localStore('originalSentence'),
              scrambledSentenceAsPromise = localStore('scrambledSentence'),
              scoreAsPromise = localStore('appScore'),
              nextSentenceAsPromise = localStore('nextSentence')
