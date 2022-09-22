# lyrics.chrissx.de

Let's face it: Sites for viewing lyrics are kinda crappy. Let's fix it!

You can license the code (`src/*`) under the terms of the
[GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html). The
lyrics file (`albums.yaml`) is copyrighted and not licensed to you.

## `albums.yaml`

This file contains all the lyrics in Genius format. As the extension implies, it
is written in a YAML-based format. That will be detailed here to aid both with
editing it and making tools that consume it.

The root is a `list<Album>`.

### `Album`

- `name`
- `upc?`
- `artists`
- `release`
- `tracks`: `list<Track>`

### `Track`

- `name`
- `isrc?`
- `length`
- `lyrics?`
- `artists?` (usually missing, if it has the same as the album)

### `lyrics`

The actual lyrics are formatted very similar to
[Genius's](https://genius.com/Genius-how-to-add-songs-to-genius-annotated), a
more detailed guide is to be written.
