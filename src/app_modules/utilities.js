export const UTIL = function(){

  function splitWords(input) {
    let words = input.trim().split(" ");
    let sentence = "";

    for(var i = 0, l = words.length ; i < l ; i ++) {
      if (words[i].length > 3) {
        sentence += scramble(words[i]);
      } else {
        sentence += words[i];
      }
      if(i <= (l - 1)) {
        sentence += " ";
      }
    }

    return sentence;
  }

  function scramble(word){
    const WORD = word.split('');
    const BEGIN = WORD.shift();
    const END = WORD.pop();

    let scrambled = BEGIN;
    let reducedWord = WORD;

    for(var i = 0 ; i < reducedWord.length ; ) {
      let targetIndex = Math.round(Math.random() * (reducedWord.length - 1));
      scrambled += reducedWord.splice(targetIndex, 1);
    }

    scrambled += END;
    return scrambled ;
  }


  return { scramble: splitWords }

}()
