#!/usr/bin/env node
import g2mm from "./index.mjs";

const input = [];
// for some f-ing js-reason this cant be η-reduced
process.stdin.on('data', (x) => input.push(x));
process.stdin.on('end', () => console.log(g2mm(input.join(""))));
