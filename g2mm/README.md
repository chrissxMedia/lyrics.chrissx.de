# `g2mm`

A library and tool for converting lyrics from Genius style to Musixmatch style.

## The tool

The `g2mm` tool currently only reads your Genius style lyrics from `stdin` and
writes them re-formatted to `stdout`, like this:

```sh
npx g2mm < my_genius_lyrics.txt > my_musixmatch_lyrics.txt
```

## The library

There is only one function, `genius2musixmatch`:

```js
import { genius2musixmatch } from 'g2mm';
```

Alternatively, you can import it like this:

```js
import genius2musixmatch from 'g2mm';
```

It's used like this:

```js
const my_musixmatch_lyrics = genius2musixmatch(my_genius_lyrics);
```
