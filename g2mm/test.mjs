#!/usr/bin/env node
import genius2musixmatch from './index.mjs';
import { expect } from 'expect';

const genius = `[Songtext zu ...nein]

[Part]
This is a part,
oh ja!

[Bridge: Mister Häfftling]
My life is nice:
Swag!

[Hook: chrissx]
trap

[Verse 2]
hello
[häffti]
hi too`;

const musixmatch = `#VERSE
This is a part,
oh ja!

#BRIDGE
My life is nice:
Swag!

#HOOK
trap

#VERSE
hello
hi too`;

expect(genius2musixmatch(genius)).toBe(musixmatch);
