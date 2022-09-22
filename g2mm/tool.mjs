#!/usr/bin/env node
import genius2musixmatch from "./index.mjs";

const input = [];
// for some f-ing js-reason this cant be η-reduced
process.stdin.on('data', (x) => input.push(x));
process.stdin.on('end', () => console.log(genius2musixmatch(input.join())));
