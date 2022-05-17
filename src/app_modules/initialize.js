import { scoreAsPromise, correctSentenceAsPromise, scrambledSentenceAsPromise, nextSentenceAsPromise } from '../stores.js';
import { API } from './api.js';

export default function init() {
  if((localStorage.getItem('originalSentence') !== 'undefined') && (parseInt(localStorage.getItem('appScore')) !== 10)) {
    for (const [key, value] of Object.entries(localStorage)) {
      if(key === 'originalSentence' && value !=='undefined') {
        correctSentenceAsPromise.set(value.split(','));
      }
      if(key === 'scrambledSentence' && value !=='undefined') {
        scrambledSentenceAsPromise.set(value);
      }
      if(key === 'appScore' && value !=='undefined') {
        scoreAsPromise.set(value);
      }
      if(key === 'nextSentence' && value !== 'undefined') {
        nextSentenceAsPromise.set(value)
      }
    }
  }
  else {
    if(parseInt(localStorage.getItem('appScore')) === 10) {
      localStorage.removeItem('originalSentence');
      localStorage.removeItem('scrambledSentence');
    }
    scoreAsPromise.set('0');
    nextSentenceAsPromise.set('1');
    API.get(1);
  }

}
