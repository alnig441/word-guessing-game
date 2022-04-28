
import { originalSentenceAsPromise } from "../stores.js"

export const UTIL = {

  getSentence: async function(url) {
    const RESPONSE = await fetch(url);
    const SENTENCE = await RESPONSE.json();
    const WORDS = SENTENCE.data.sentence.split(' ');
    originalSentenceAsPromise.set(WORDS);
    return UTIL.wordScrambler(WORDS);
  },

  wordScrambler: function(words) {
    const LENGTH = words.length;
    let sentence = '';

    for(let i = 0 ; i < LENGTH ; i ++) {
      if (words[i].length > 3) {
        sentence += scramble(words[i]);
      } else {
        sentence += words[i];
      }
      if(i <= (LENGTH -1)) {
        sentence += ' ';
      }
    }

    return sentence;

    function scramble(word){
      const WORD = word.split('');
      const BEGIN = WORD.shift();
      const END = WORD.pop();

      let scrambled = BEGIN;

      let reducedWord = WORD;

      for(let i = 0 ; i < reducedWord.length ; ) {
        let targetIndex = Math.round(Math.random() * (reducedWord.length - 1));
        scrambled += reducedWord.splice(targetIndex, 1);
      }

      scrambled += END;
      return scrambled ;
    }
  }
}