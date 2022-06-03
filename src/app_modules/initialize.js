import {  correctSentenceAsPromise, nextSentenceAsPromise } from '../stores.js';
import { API } from './api.js';

export default async function init(){
  let sentences = [];
  const index = parseInt(localStorage.getItem('nextSentence'));

  if (index && index !== 10) {
    nextSentenceAsPromise.set(index);
  }
  else {
    nextSentenceAsPromise.set(0);
  }

  await API.getAll().then(res => sentences = res);
  return sentences;

}
