# `g2mm`

A library and tool for converting lyrics from Genius style to Musixmatch and
Plain (i.e. Apple Music) styles.

## The tool

The `g2mm` tool currently only reads your Genius style lyrics from `stdin` and
writes them re-formatted in Musixmatch style to `stdout`, like this:

```sh
npx g2mm < my_genius_lyrics.txt > my_musixmatch_lyrics.txt
```

## The library

There is only one function, `g2mm`:

```js
import { g2mm } from "g2mm";
```

Alternatively, you can import it like this:

```js
import g2mm from "g2mm";
```

It's used like this:

```js
const my_musixmatch_lyrics = g2mm(my_genius_lyrics);
const my_plain_lyrics = g2mm(my_genius_lyrics, "plain");
```
