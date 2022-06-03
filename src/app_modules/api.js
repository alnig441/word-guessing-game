import { correctSentenceAsPromise } from "../stores.js"

export const API = function(){

  async function getAll() {
    let urls = [];
    for (var i = 1 ; i <= 10 ; i ++) {
      urls.push(`https://api.hatchways.io/assessment/sentences/${i}`)
    }

    let sentences = Promise.all(urls.map(async url => {
      try {
        const RESP = await fetch(url);
        const RES = await RESP.json();
        return RES.data.sentence;
      } catch(error) {
        console.log('error: ', error)
      }
    }))

    return sentences;
  }

  return { getAll: getAll }

}();
