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
