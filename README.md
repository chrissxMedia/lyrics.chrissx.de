# Lyrics

Let's face it: Sites for viewing lyrics are kinda crappy. Let's fix it!

You can assume that the code (`main.dart`) is GPLv2 licensed. The rest of this
repo, especially the lyrics file (`albums.yaml`) is copyrighted and not licensed
to you.

## `albums.yaml`

This file contains all the lyrics. As the extension implies, it is written in a
YAML-based format. That will be detailed here to aid both with editing it and
making tools that consume it.

The root is a `list<Album>`.

### `Album`

- `name`
- `upc`
- `artists`
- `release`
- `tracks`: `list<Track>`

### `Track`

- `name`
- `isrc`
- `length`
- `lyrics` (may be missing if it is instrumental or not transcribed yet)
- `artists` (usually missing, if it has the same as the album)
