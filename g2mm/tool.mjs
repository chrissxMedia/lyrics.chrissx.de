#!/usr/bin/env node
import genius2musixmatch from "./index.mjs";

let input = [];
// for some f-ing js-reason this cant be eta-reduced
process.stdin.on('data', (x) => input.push(x));
process.stdin.on('end', () => console.log(genius2musixmatch(input.join())));
