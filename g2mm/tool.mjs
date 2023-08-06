#!/usr/bin/env node
import g2mm from "./index.mjs";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const style = argv["genius"] || argv["g"] ? "genius"
    : argv["plain"] || argv["p"] ? "plain" : "musixmatch";

const input = [];
// for some f-ing js-reason this cant be η-reduced
process.stdin.on('data', (x) => input.push(x));
process.stdin.on('end', () => console.log(g2mm(input.join(""), style)));
