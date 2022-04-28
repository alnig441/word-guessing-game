import { writable } from 'svelte/store';

export const originalSentenceAsPromise = writable([]),
              scrambledSentenceAsPromise = writable([]),
              scoreAsPromise = writable(0),
              counterAsPromise = writable(0)
