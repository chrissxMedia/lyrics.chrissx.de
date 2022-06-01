export type track = {
    name: string,
    isrc: string,
    length: number,
    lyrics?: string,
    artists?: [string],
};

export type album = {
    name: string,
    upc: number,
    artists: [string],
    release: string,
    tracks: [track],
};

export type search = {
    isrc: string,
    name: string,
    lyrics: string,
    invert: boolean,
};
