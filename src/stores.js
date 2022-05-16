import { writable } from 'svelte/store';
import { localStore } from './localStore';

export const  correctSentenceAsPromise = writable(''),
              scrambledSentenceAsPromise = writable(''),
              scoreAsPromise = writable(0)

export const  originalSentence = localStore('originalSentence'),
              scrambledSentence = localStore('scrambledSentence'),
              appScore = localStore('appScore')

appScore.set(0)
