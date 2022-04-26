# lyrics.chrissx.de

Let's face it: Sites for viewing lyrics are kinda crappy. Let's fix it!

You can assume that the code (`index.html`, `style.css`, `app.jsx`, ...) is
[GPLv2](https://www.gnu.org/licenses/old-licenses/gpl-2.0-standalone.html)
licensed. The lyrics file (`albums.yaml`) is copyrighted and not licensed to
you.

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
