import { BinarySort } from './BinarySort.js';
const parent = document.getElementsByClassName('sort')[0];
const sort = new BinarySort(parent, 10);
sort.start();
